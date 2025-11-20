// rollup.config.js
export default [
  {
    input: "src/index.ts",
    external: ["react", "react-dom", "react-select", "react-picky"],
    plugins: [
      require("rollup-plugin-peer-deps-external")(),
      require("@rollup/plugin-node-resolve").default(),
      require("@rollup/plugin-commonjs")(),
      require("@rollup/plugin-typescript").default({ tsconfig: "./tsconfig.json" }),
      require("rollup-plugin-postcss")({
        extract: true,
        minimize: true,
        sourceMap: true,
        modules: {
          auto: /\.module\.\w+$/,
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        },
        use: ["sass"]
      })
    ],
    output: [
      { file: "dist/index.cjs", format: "cjs", sourcemap: true, exports: "named" },
      // optional:
      { file: "dist/index.mjs", format: "esm", sourcemap: true }
    ]
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts" }],
    plugins: [require("rollup-plugin-dts").default()],
    external: [/\.s?css$/]
  }
];
