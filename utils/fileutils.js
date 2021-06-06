const fs = require("fs");

function filePaths(initialPath){

    const files = [];
    const folderQueue = [];

    folderQueue.push(initialPath);

    while (folderQueue.length > 0) {

        const folder = folderQueue.shift();
        const allFiles = fs.readdirSync(folder);

        allFiles.forEach((file) => {
            const p = folder+"/"+file;
            stats = fs.statSync(p);
            if (stats.isDirectory()) {
                folderQueue.push(p);
            } else {
                files.push(p);
            }
        })

    }
    return files;
}

exports.filePaths = filePaths;
