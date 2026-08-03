import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "fs";

function getLocalChromeExecutablePath(): string {
  const paths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    process.env.LOCALAPPDATA + "\\Google\\Chrome\\Application\\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
  ];

  for (const path of paths) {
    if (path && fs.existsSync(path)) {
      return path;
    }
  }

  throw new Error(
    "Nessun eseguibile di Chrome trovato in locale. Installa Google Chrome o imposta la variabile di ambiente."
  );
}

export async function generatePdfFromHtml(html: string): Promise<Buffer> {
  let browser = null;

  try {
    const isDev = process.env.NODE_ENV === "development";

    const executablePath = isDev
      ? getLocalChromeExecutablePath()
      : await chromium.executablePath();

    browser = await puppeteer.launch({
      args: isDev
        ? ["--no-sandbox", "--disable-setuid-sandbox"]
        : chromium.args,
      defaultViewport: { width: 1920, height: 1080 },
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();

    // Inietta HTML e attende il caricamento completo
    await page.setContent(html, {
      waitUntil: ["load", "networkidle0"] as any,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("❌ Errore durante la generazione del PDF con Puppeteer:", error);
    throw new Error("Impossibile generare il PDF dal template.");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}