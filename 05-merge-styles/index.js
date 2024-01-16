const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      streamMergeRecursive(
        files.filter(
          (file) =>
            file.isFile() && path.extname(file.name).toLowerCase() === '.css',
        ),
        output,
      );
    }
  },
);

function streamMergeRecursive(files = [], fileWriteStream) {
  if (!files.length) {
    return fileWriteStream.end();
  }

  const currentFile = path.resolve(__dirname, 'styles', files.shift().name);
  const currentReadStream = fs.createReadStream(currentFile);

  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on('end', function () {
    streamMergeRecursive(files, fileWriteStream);
  });

  currentReadStream.on('error', function (error) {
    console.error(error);
    fileWriteStream.close();
  });
}
