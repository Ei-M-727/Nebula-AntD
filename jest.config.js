// module.exports = {
//   //   displayName: "mylib",
//   //   preset: "../../jest.preset.js",
//   transform: {
//     "^.+\\.[tj]sx?$": ["babel-jest", { cwd: __dirname }],
//   },
//   transformIgnorePatterns: ["node_modules/(?!(@/axios)/)"],
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
//   //   coverageDirectory: "../../coverage/libs/mylib",
//   moduleNameMapper: {
//     // 将 pkg1 esm 替换成 cjs
//     "pkg1/esm/(.*)": "<rootDir>/node_modules/pkg1/cjs/$1",

//     // 比如常见的 lodash-es
//     "lodash-es/(.*)": "lodash/$1",
//   },
// };

// module.exports = {
//   //   preset: "ts-jest",
//   //   testEnvironment: "node",
//   //   transform: {
//   //     "^.+\\.ts?$": "ts-jest",
//   //   },
//   //   transformIgnorePatterns: ["node_modules/(?!axios)/"],
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//   },
//   testMatch: [
//     "**/__tests__/**/*.+(ts|tsx|js)|**/?(*.)+(spec|test).+(ts|tsx|js)",
//   ],
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   moduleNameMapper: {
//     "^axios": "<rootDir>/node_modules/axios",
//   },
// };

// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   transform: {
//     "node_modules/@axios/.+\\.(j|t)sx?$": "ts-jest",
//   },
//   transformIgnorePatterns: ["node_modules/(?!@axios/.*)", "(?!__tests__/)"],
// };
module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest", // 使用 babel-jest 转换所有 .js 和 .jsx 文件
    // 其他转换器配置...
  },
  // 其他 Jest 配置...
  transformIgnorePatterns: [
    // 忽略 node_modules 中除了 react-* 和 @babel/runtime 之外的所有文件
    "<rootDir>/node_modules/(?!(axios)/.*)",
  ],
};
