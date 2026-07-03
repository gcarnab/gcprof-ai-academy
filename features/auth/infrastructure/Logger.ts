export class Logger {
  static info(message: string, context?: any): void {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`, context || "");
  }

  static warn(message: string, context?: any): void {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, context || "");
  }

  static error(message: string, error?: any): void {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, error || "");
  }
}