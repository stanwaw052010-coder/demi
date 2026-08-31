import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  { ignores: [".next/**", "node_modules/**", ".data/**", "content/**/*.mdx"] },
  ...coreWebVitals,
  ...typescript,
];

export default config;
