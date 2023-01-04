const core = require('@actions/core');
const github = require('@actions/github')


async function run() {
  try { 
    core.startGroup('input/outputs')

    // const token = core.getInput('github_token')

    // const octokit = github.getOctokit(token)
    
    const fields = ['action', 'actor', 'eventName', 'issue', 'job', 'payload', 'ref', 'repo', 'runId', 'runNumber', 'workflow']

    fields.forEach((field) => core.info(`${field}: ${github.context[field]}`))

    core.endGroup()
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
