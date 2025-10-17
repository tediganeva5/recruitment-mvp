import js from "@eslint/js";
import next from "eslint-config-next";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  js.configs.recommended, // ✅ enables no-undef and other basic JS rules
  ...next(),
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "no-undef": "error", // ✅ underline undeclared variables
      "no-unused-vars": "warn", // optional, warns for unused variables
    },
  },
];

export default eslintConfig;
