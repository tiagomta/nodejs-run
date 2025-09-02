import * as core from "@actions/core";
import gitInit from "./git.js";
import npmInit from "./npm.js";
import giteaInit from "./gitea.js";

async function run() {
  try {
    const directory = core.getInput("working-directory");
    if (directory) process.chdir(directory);
    const target = core.getInput("target");
    global.gitea = giteaInit(JSON.parse(core.getInput("context")));
    global.git = gitInit();
    global.npm = npmInit();
    global.result = null;
    if (target === "filepath")
      (await import(core.getInput("filepath"))).default;
    else if (target === "inline")
      await eval(`(async() => {${core.getInput("run")}})()`);
    // eslint-disable-line no-eval
    else throw new Error(`Unknown target: ${target}`);
    console.log(typeof global.result);
    if (global.result instanceof Promise)
      core.setOutput("result", await global.result);
    else core.setOutput("result", global.result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
