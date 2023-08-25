const concat = require('concat');
(async function build() {
  const files = [
    './dist/user-app/runtime.js',
    './dist/user-app/polyfills.js',
    './dist/user-app/main.js',
    './dist/user-app/scripts.js'
  ];
  await concat(files, './dist/user-app/user-app.js');
}
)();
