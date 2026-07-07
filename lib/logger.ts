// gcprof-ai-academy/lib/logger.ts

const LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

type LogLevel = keyof typeof LEVELS;

// Determina il livello minimo di logging dall'ambiente (default: INFO)
const CURRENT_LEVEL = (process.env.LOG_LEVEL || "INFO").toUpperCase() as LogLevel;

/**
 * Verifica se il livello richiesto deve essere registrato in base alla configurazione
 */
function shouldLog(level: LogLevel): boolean {
  const currentIdx = LEVELS[CURRENT_LEVEL] !== undefined ? LEVELS[CURRENT_LEVEL] : 1;
  return LEVELS[level] >= currentIdx;
}

/**
 * Formatta il messaggio aggiungendo timestamp, livello e argomenti extra (es. oggetti di errore)
 */
function formatMessage(level: LogLevel, message: string, ...args: any[]): string {
  const timestamp = new Date().toISOString();
  const extra = args.length 
    ? ` ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}` 
    : '';
  return `[${timestamp}] [${level}] ${message}${extra}`;
}

/**
 * Scrive il log su file system solo se siamo in ambiente di sviluppo locale
 */
function logToFile(formattedMessage: string) {
  if (
    typeof window === "undefined" && // Sicurezza per l'ambiente Server
    process.env.NODE_ENV === "development" &&
    process.env.ENABLE_FILE_LOGGING === "true"
  ) {
    try {
      // Importiamo i moduli Node in modo dinamico per non rompere il bundler sul client
      const fs = require("fs");
      const path = require("path");
      
      const logPath = process.env.LOG_FILE_PATH || "./logs/app.log";
      const fullPath = path.resolve(process.cwd(), logPath);
      const dir = path.dirname(fullPath);

      // Crea la cartella /logs se non esiste
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Scrive in modalità append
      fs.appendFileSync(fullPath, formattedMessage + "\n", "utf8");
    } catch (e) {
      // Fallback silenzioso per impedire crash applicativi dovuti ai log
      console.warn("⚠️ Impossibile scrivere sul file di log:", e);
    }
  }
}

// Esportazione del logger centralizzato
export const logger = {
  debug: (msg: string, ...args: any[]) => {
    if (!shouldLog("DEBUG")) return;
    const formatted = formatMessage("DEBUG", msg, ...args);
    console.log(formatted);
    logToFile(formatted);
  },
  info: (msg: string, ...args: any[]) => {
    if (!shouldLog("INFO")) return;
    const formatted = formatMessage("INFO", msg, ...args);
    console.log(formatted);
    logToFile(formatted);
  },
  warn: (msg: string, ...args: any[]) => {
    if (!shouldLog("WARN")) return;
    const formatted = formatMessage("WARN", msg, ...args);
    console.warn(formatted);
    logToFile(formatted);
  },
  error: (msg: string, ...args: any[]) => {
    if (!shouldLog("ERROR")) return;
    const formatted = formatMessage("ERROR", msg, ...args);
    console.error(formatted);
    logToFile(formatted);
  },
};