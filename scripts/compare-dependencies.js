const rootPackageJson = require('../package.json');
const functionsPackageJson = require('../functions/package.json');

const exceptions = {
  express: true
};

function check() {
  const missingPackages = [];
  Object.keys(rootPackageJson.dependencies)
    .filter((dependency) => {
      return !(dependency in exceptions);
    })
    .forEach((dependency) => {
      const match = dependency in functionsPackageJson.dependencies;
      if (!match) {
        missingPackages.push(dependency);
      }
    });

  if (missingPackages.length) {
    console.error(`Missing packages: ${missingPackages.join(',')}`);
    process.exit(1);
  } else {
    console.log('All packages are present');
  }
}

check();
