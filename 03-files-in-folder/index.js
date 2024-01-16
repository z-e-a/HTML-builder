const fs = require('fs');
const path = require('path');

try {
  fs.readdir(
    path.join(__dirname, 'secret-folder'),
    { withFileTypes: true },
    (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          if (file.isFile()) {
            fs.stat(
              path.join(__dirname, 'secret-folder', file.name),
              (err, fileStats) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log(
                  `${path.parse(file.name).name} - ${path
                    .parse(file.name)
                    .ext.replace(/^./, '')} - ${fileStats.size} bytes`,
                );
              },
            );
          }
        });
      }
    },
  );
} catch (err) {
  console.error(err);
}
