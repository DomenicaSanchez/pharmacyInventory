module.exports = {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.mjs",
      options: {
        parser: "babel",
      },
    },
  ],
};
