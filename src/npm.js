import { getExecOutput } from "@actions/exec";

export default function () {
  return {
    install: async (...args) =>
      (await getExecOutput("npm", ["install", ...args]))?.stdout,
    publish: async (...args) =>
      (await getExecOutput("npm", ["publish", ...args]))?.stdout,
    version: async (...args) =>
      (await getExecOutput("npm", ["version", ...args]))?.stdout,
  };
}
