const path = require("path");
const fs = require("fs");
const { runCommandInDirectory } = require("./utils");
const { moveDirectoryContents } = require("./helper");



const mockCreateApp = (appPath) => {
  console.log(`Mocking app creation at: ${appPath}`);
  fs.mkdirSync(appPath, { recursive: true }); // Create directory

  // Create some placeholder files to mimic an Expo app
  fs.writeFileSync(path.join(appPath, "App.js"), "console.log('Mock App');");
  fs.writeFileSync(
    path.join(appPath, "package.json"),
    JSON.stringify({ name: "mock-app", version: "0.1.0" }, null, 2)
  );
  fs.mkdirSync(path.join(appPath, "assets"));
//   fs.mkdirSync(path.join(appPath, "node_modules")); // Mock node_modules folder
};


const cloneBP = (appPath) => {
  const command = "git clone https://github.com/Milvasoft/expo-boilerplate.git"; // Example command
  runCommandInDirectory(command, appPath);

  const target = path.join(appPath, "expo-boilerplate", 'src'); // Replace with your target folder
  const destination = path.join(appPath,'src'); 
  moveDirectoryContents(target, destination);
  // delete the cloned repo BP afer copy pate stuff
};


// Main function to automate the setup
const setupBoilerplate = async () => {
  const appName = process.argv[2];

  if (!appName) {
    console.error(
      "Please provide a name for your app: node setup-boilerplate.js <app-name>"
    );
    process.exit(1);
  }

  const appPath = path.join(process.cwd(), appName);

  console.log(`Creating a new Expo app: ${appName}`);
  // just mocking the create expo project
  mockCreateApp(appPath);

  cloneBP(appPath);


  console.log("Setup complete! Your app is ready.");
};

// Ensure setupBoilerplate runs
setupBoilerplate();
