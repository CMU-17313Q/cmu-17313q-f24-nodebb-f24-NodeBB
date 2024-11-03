// @ts-check
/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
module.exports = {
  mutator: "javascript",
  packageManager: "npm",
  reporters: ["clear-text", "progress"],
  testRunner: "command",
  coverageAnalysis: "all",
  disableTypeChecks: "app/**/*.{js,ts,jsx,tsx,html,vue}",
  ignorePatterns: [
    ".stryker-tmp/**", // Ignore all files in .stryker-tmp directory
    "build/public/plugins/**"
  ]
};
