import { TOKEN_CONSTANTS } from "../constants/TokenConstants";
import { ITokenService, ITokenPayload } from "../ports/ITokenService";

import { SignJWT, jwtVerify, decodeJwt } from "jose";

export class JoseTokenService implements ITokenService {
  private getSecretKey(): Uint8Array {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("CRITICAL: La variabile d'ambiente JWT_SECRET non è configurata!");
    }
    return new TextEncoder().encode(secret);
  }

  async generate(payload: ITokenPayload, expiresIn: string = TOKEN_CONSTANTS.DEFAULT_EXPIRATION): Promise<string> {
    return await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: TOKEN_CONSTANTS.ALGORITHM })
      .setIssuedAt()
      .setIssuer(TOKEN_CONSTANTS.ISSUER)
      .setExpirationTime(expiresIn)
      .sign(this.getSecretKey());
  }

  async verify(token: string): Promise<ITokenPayload | null> {
    try {
      const { payload } = await jwtVerify(token, this.getSecretKey(), {
        issuer: TOKEN_CONSTANTS.ISSUER,
      });
      return payload as unknown as ITokenPayload;
    } catch (error) {
      // Il token è alterato o scaduto
      return null;
    }
  }

  decode(token: string): ITokenPayload | null {
    try {
      return decodeJwt(token) as unknown as ITokenPayload;
    } catch {
      return null;
    }
  }

  isExpired(token: string): boolean {
    try {
      const payload = decodeJwt(token);
      if (!payload.exp) return true;
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }
}