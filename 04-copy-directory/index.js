const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

async function removeDir() {
  try {
    await fsp.rm(
      path.join(__dirname, 'files-copy'),
      { recursive: true },
      () => {
        console.log('directory removed');
      },
    );
  } catch (e) {
    console.log(e);
  }
}

async function createDir() {
  fs.mkdir(
    path.join(__dirname, 'files-copy'),
    { recursive: false },
    function () {},
  );
}

async function copyFiles() {
  await fs.readdir(
    path.join(__dirname, 'files'),
    { withFileTypes: true },
    (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          if (file.isFile()) {
            console.log(file.name, ' copied!');
            fs.copyFile(
              path.join(__dirname, 'files', file.name),
              path.join(__dirname, 'files-copy', file.name),
              (err) => {
                if (err) {
                  console.log('Error Found:', err);
                }
              },
            );
          }
        });
      }
    },
  );
}

fs.access(path.join(__dirname, 'files-copy'), async (err) => {
  if (err) {
    await createDir();
    copyFiles();
  } else {
    await removeDir();
    await createDir();
    copyFiles();
  }
});
