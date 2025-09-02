import { exec } from "@actions/exec";

export default function () {
  return {
    commit: (...args) => exec("git", ["commit", ...args]),
    config: (...args) => exec("git", ["config", ...args]),
    push: (...args) => exec("git", ["push", ...args]),
    tag: (...args) => exec("git", ["tag", ...args]),
    clone: (...args) => exec("git", ["clone", ...args]),
    checkout: (...args) => exec("git", ["checkout", ...args]),
    fetch: (...args) => exec("git", ["fetch", ...args]),
    pull: (...args) => exec("git", ["pull", ...args]),
  };
}
