const Funnel = require("broccoli-funnel");
const Merge = require("broccoli-merge-trees");
const CompileSass = require("broccoli-sass-source-maps");

const appRoot = "app";

// Copy HTML file from app root to destination
const html = new Funnel(appRoot, {
  files: ["index.html"],
  annotation: "Index file",
});

// Copy JS file into assets
const js = new Funnel(appRoot, {
  files: ["app.js"],
  destDir: "/assets",
  annotation: "JS files",
});

// Compile sass files
const css = new CompileSass(
  [appRoot],
  "styles/app.scss",
  "assets/app.css",
  {
    sourceMap: true,
    sourceMapContents: true,
    annotation: "Sass files"
  }
);

// Copy public files into destination
const public = new Funnel('public', {
  annotation: "Public files",
});

module.exports = new Merge([html, js, css, public], {annotation: "Final output"});
