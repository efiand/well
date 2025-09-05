import { execSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { devDependencies = {} } = require("../package.json");

const packages = Object.keys(devDependencies);
execSync(`npm i -DE ${packages.join("@latest ")}@latest`);
