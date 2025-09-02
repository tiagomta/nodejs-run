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
    let result;
    if (target === "filepath")
      result = (await import(core.getInput("filepath"))).default;
    else if (target === "inline")
      result = eval(
        `((result = {}) => ((async() => {${core.getInput(
          "run"
        )}})(), result))()`
      );
    // eslint-disable-line no-eval
    else throw new Error(`Unknown target: ${target}`);
    console.log("Result:", result);
    if (result instanceof Promise) core.setOutput("result", await result);
    else core.setOutput("result", result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
