module.exports = {
    roots: ["<rootDir>/src"],
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    globalSetup: "<rootDir>/test/setup.mjs",
    globalTeardown: "<rootDir>/test/teardown.mjs"
}
