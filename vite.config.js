import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solidPlugin({
      hot: false,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  test: {
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    environment: "jsdom",
    globals: true,
    transformMode: { web: [/\.[jt]sx$/] },
  },
  resolve: {
    conditions: ["browser", "development"],
  },
});
