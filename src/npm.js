import { exec } from "@actions/exec";

function npm() {
  return {
    install: (...args) => exec("npm", ["install", ...args]),
    publish: (...args) => exec("npm", ["publish", ...args]),
    version: (...args) => exec("npm", ["version", ...args]),
  };
}

export default npm;
export { npm };
