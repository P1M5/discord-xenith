const fs = require("fs");

/**
* @function
* @description This function takes a starting (root) path and uses `Breadth-First Seach`
* algorithm to traverse folders until all files are found. The relative file paths
* from the root path are then returned.
*
* @arg {string} initialPath - Root path from the execution directory.
* @returns {string[]} - Array of all file paths in the root directory (or its subdirectories).
*/
function filePaths(initialPath) {

	const files = [];
	const folderQueue = []; // Queue for BFS

	folderQueue.push(initialPath);

	while (folderQueue.length > 0) {

		const folder = folderQueue.shift();
		const allFiles = fs.readdirSync(folder);

		allFiles.forEach((file) => {
			const p = folder + "/" + file;
			const stats = fs.statSync(p);
			if (stats.isDirectory()) {
				folderQueue.push(p);
			}
			else {
				files.push(p);
			}
		});

	}
	return files;
}

exports.filePaths = filePaths;
