const { execSync } = require("child_process");

// Function to execute shell commands in a specific directory
const runCommandInDirectory = (command, directory) => {
    try {
      execSync(command, { cwd: directory, stdio: "inherit" });
    } catch (error) {
      console.error(
        `Failed to execute command: ${command} in directory: ${directory}`,
        error
      );
      process.exit(1);
    }
  };

  module.exports={
    runCommandInDirectory
  }