/** @type {import('next').NextConfig} */

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/onnxruntime-web/dist/*.wasm",
            to: "static/chunks/[name][ext]",
          },
          // {
          //   from: "node_modules/onnxruntime-web/dist/*.wasm",
          //   to: "public/wasm",
          // },
        ],
      })
    );
    return config;
  },
  images: {
    domains: ["cloud.appwrite.io"],
  },
};

module.exports = nextConfig;
