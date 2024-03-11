// module.exports = {
//   presets: [
//     [
//       "@babel/preset-env",
//       {
//         targets: {
//           node: true,
//         },
//       },
//     ],
//   ],
// };

// module.exports = {
//   presets: [
//     [
//       "@nrwl/react/babel",
//       {
//         runtime: "automatic",
//         useBuiltIns: "usage",
//       },
//     ],
//   ],

//   env: {
//     test: {
//       plugins: ["@babel/plugin-transform-modules-commonjs"],
//     },
//   },
// };

module.exports = {
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"],
    },
  },
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
