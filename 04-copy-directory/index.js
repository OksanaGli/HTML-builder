const fsPromises = require('fs/promises');

const path = require('path');
const srcFolder = '/files';
const destFolder = '/copy-files';

const srcPath = () =>
  path.join(__dirname, '..', '04-copy-directory', srcFolder);

const destPath = () =>
  path.join(__dirname, '..', '04-copy-directory', destFolder);

const copyDirectory = async (src, dest) => {
  try {
    await fsPromises.mkdir(dest, { recursive: true });

    const entries = await fsPromises.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcEntryPath = path.join(src, entry.name);
      const destEntryPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(srcEntryPath, destEntryPath);
      } else {
        await fsPromises.copyFile(srcEntryPath, destEntryPath);
        console.log(`File ${entry.name}  is copied to ${dest}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  try {
    const src = srcPath();
    const dest = destPath();

    await copyDirectory(src, dest);
  } catch (err) {
    console.error(err);
  }
})();
