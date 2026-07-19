# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\auth\adminGuard.spec.ts >> Auth Guards - Protezione Rotte >> dovrebbe rimbalzare un utente non autenticato alla pagina di login tentando di accedere all'admin
- Location: e2e\auth\adminGuard.spec.ts:4:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/admin", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Auth Guards - Protezione Rotte", () => {
  4  |   test("dovrebbe rimbalzare un utente non autenticato alla pagina di login tentando di accedere all'admin", async ({ page }) => {
  5  |     // 1. Tentiamo l'accesso alla rotta protetta.
  6  |     // Utilizziamo un percorso relativo: Playwright userà automaticamente il baseURL del file di configurazione.
> 7  |     await page.goto("/admin");
     |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  8  | 
  9  |     // 2. Verifichiamo che l'URL finale sia cambiato contenendo la rotta di login.
  10 |     // Utilizziamo una regex per gestire anche eventuali query parameters di redirect (es. /login?callbackUrl=...)
  11 |     await expect(page).toHaveURL(/.*login.*/);
  12 |   });
  13 | });
```