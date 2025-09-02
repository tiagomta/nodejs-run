import * as core from "@actions/core";
import { git } from "./git.js";
import { npm } from "./npm.js";
import { gitea } from "./gitea.js";

async function run() {
  try {
    const directory = core.getInput("working-directory");
    if (directory) process.chdir(directory);
    const target = core.getInput("target");
    global.gitea = gitea(JSON.parse(core.getInput("context")));
    global.git = git();
    global.npm = npm();
    let result;
    if (target === "filepath")
      result = (await import(core.getInput("filepath"))).default;
    else if (target === "inline")
      result = eval(core.getInput("run")); // eslint-disable-line no-eval
    else throw new Error(`Unknown target: ${target}`);
    if (result instanceof Promise) core.setOutput("result", await result);
    else core.setOutput("result", result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
