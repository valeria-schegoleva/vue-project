import browserSync from 'browser-sync';

const bs = browserSync.create();

bs.init({
  proxy: "http://localhost:5173", // Your Vite dev server
  files: ["**/*.html", "**/*.js", "**/*.css"], // Watch files for changes
  open: true, // Automatically open the browser
});
