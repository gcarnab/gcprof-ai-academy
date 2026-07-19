import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },

  test: {
    globals: true,

    environment: "jsdom",

    setupFiles: ["./tests/setupTests.ts"],

    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],

    exclude: ["node_modules", ".next", "e2e", "coverage", "dist"],

    coverage: {
      provider: "v8",

      reporter: ["text", "html"],

      reportsDirectory: "./coverage",
    },
  },
});
