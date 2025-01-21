const fs = require('fs');
const path = require('path');
const folder = '/secret-folder';
const getPath = () => path.join(__dirname, '..', '03-files-in-folder', folder);

fs.readdir(getPath(), { withFileTypes: true }, (err, entries) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  entries.forEach((entry) => {
    if (entry.isFile()) {
      const filePath = path.join(getPath(), entry.name);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log(err.message);
          throw err;
        }

        const fileName = path.basename(entry.name, path.extname(entry.name));
        const fileExtension = path.extname(entry.name).slice(1);
        const fileSize = stats.size;

        console.log(`${fileName} - ${fileExtension} - ${fileSize}`);
      });
    }
  });
});
