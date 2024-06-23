module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.[jt]s?(x)'],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}"
  ],
};
  