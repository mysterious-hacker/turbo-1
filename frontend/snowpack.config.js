/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
 mount: {
  /* ... */
 },
 plugins: [
  /* ... */
  "@snowpack/plugin-svelte",
  "@snowpack/plugin-postcss",
 ],
 exclude: [
  "**/node_modules/**/*",
  "queries-plugin.js",
  "run-codegen.mjs",
  "**/typescript-urql-svelte/**/*",
 ],
 routes: [
  /* Enable an SPA Fallback in development: */
  // {"match": "routes", "src": ".*", "dest": "/index.html"},
 ],
 optimize: {
  /* Example: Bundle your final build: */
  // "bundle": true,
 },
 packageOptions: {
  /* ... */
 },
 devOptions: {
  /* ... */
 },
 buildOptions: {
  /* ... */
 },
};
