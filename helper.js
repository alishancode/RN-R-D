const fs = require('fs');
const path = require('path');

/**
 * Moves the contents of a directory to another location and deletes the original directory.
 *
 * @param {string} targetDir - The path of the directory to move.
 * @param {string} destinationDir - The path where the contents should be moved.
 */
const moveDirectoryContents = (targetDir, destinationDir) => {
  try {
    // Check if the target directory exists
    if (!fs.existsSync(targetDir)) {
      console.error(`Target directory does not exist: ${targetDir}`);
      return;
    }

    // Ensure the destination directory exists
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    // Read all files and directories inside the target directory
    const items = fs.readdirSync(targetDir);

    items.forEach((item) => {
      const sourcePath = path.join(targetDir, item);
      const destinationPath = path.join(destinationDir, item);

      // Move files or directories
      if (fs.lstatSync(sourcePath).isDirectory()) {
        fs.cpSync(sourcePath, destinationPath, { recursive: true }); // Copy subdirectory
        fs.rmdirSync(sourcePath, { recursive: true }); // Delete subdirectory
      } else {
        fs.renameSync(sourcePath, destinationPath); // Move file
      }
    });

    // Remove the now-empty target directory
    fs.rmdirSync(targetDir);

    console.log(`Moved contents of ${targetDir} to ${destinationDir} and deleted the original directory.`);
  } catch (error) {
    console.error('Error while moving directory contents:', error);
  }
};

// // Example Usage
// const target = path.join(__dirname, 'byldd', 'folder1'); // Replace with your target folder
// const destination = path.join(__dirname); // Move to root
// moveDirectoryContents(target, destination);


module.exports={
  moveDirectoryContents
}