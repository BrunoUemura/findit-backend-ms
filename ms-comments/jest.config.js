module.exports = {
  bail: false,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**"],
  coverageDirectory: "__tests__/coverage",
  coveragePathIgnorePatterns: ["src/config/*", "__tests__/coverage/*"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js?(x)"],
};
