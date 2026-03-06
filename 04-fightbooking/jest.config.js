/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest.polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          target: "ES2017",
          module: "commonjs",
          jsx: "react-jsx",
          types: ["jest", "@testing-library/jest-dom"],
          esModuleInterop: true,
          allowJs: true,
          strict: true,
          moduleResolution: "node",
          resolveJsonModule: true,
          isolatedModules: true,
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/__tests__/**/*.test.tsx",
    "**/*.test.ts",
    "**/*.test.tsx",
  ],
};

module.exports = config;

