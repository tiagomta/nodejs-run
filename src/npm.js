import { exec } from "@actions/exec";

export default function () {
  return {
    install: (...args) => exec("npm", ["install", ...args]),
    publish: (...args) => exec("npm", ["publish", ...args]),
    version: (...args) => exec("npm", ["version", ...args]),
  };
}
