module.exports = {
    setupFilesAfterEnv: ["<rootDir>/tests-config/setup.ts"],
    testEnvironment: "jsdom",
    setupFiles: ['./setupTests.ts'],
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest"],
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
};
