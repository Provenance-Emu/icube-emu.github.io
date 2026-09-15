import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16 ships flat configs natively, so the FlatCompat shim
// (@eslint/eslintrc) is no longer needed.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Node/CommonJS build tooling, not app code (no-require-imports).
    "scripts/**",
  ]),
]);

export default eslintConfig;
