// import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import reactSvg from "rollup-plugin-react-svg";
import less from 'rollup-plugin-less';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      // resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      reactSvg({
        // whether to output jsx
        jsx: false,
   
        // include: string
        include: null,
   
        // exclude: string
        exclude: null
      }),
      less({ exclude: [''] })
    ],
    external: ["react", "react-dom", "styled-components"]
  },
  // {
  //   input: "dist/esm/dist/index.d.ts",
  //   output: [{ file: "dist/index.d.ts", format: "esm" }],
  //   plugins: [dts()],
  // },
];