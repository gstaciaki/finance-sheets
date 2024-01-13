module.exports = {
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: ['js', 'json', 'node'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
  ],
  setupFiles: ["dotenv/config"]
};
