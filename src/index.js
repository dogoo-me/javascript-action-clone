const core = require('@actions/core');
const exec = require('@actions/exec')
const glob = require('@actions/glob')


// most @actions toolkit packages have async methods
async function run() {
  try { 
    // input/outputs
    core.startGroup('input/outputs')

    const fieldA = core.getInput('fieldA');
    const fieldB = core.getInput('fieldB');
    core.info(`fieldA(${typeof fieldA}): ${fieldA}`);
    core.info(`fieldB(${typeof fieldB}): ${fieldB}`);

    core.endGroup()

    // logging
    core.startGroup('logging')

    console.log('this is console log')
    core.info('this is info text')
    core.debug('this is debug text')
    core.warning('this is warning text')
    core.error('this is error text')
    core.notice('this is notice text')

    core.endGroup()

    core.startGroup('logging/ansi color')

    core.info('\033[38;2;255;0;0mred\033[0m')
    core.info('\033[38;2;0;255;0mgreen\033[0m')
    core.info('\033[38;2;0;0;255mblue\033[0m')

    core.endGroup()

    // exec
    core.startGroup('@actions/exec')
    const pwdExitCode = await exec.exec('pwd')
    core.info(`pwd exit with ${pwdExitCode}`)
    
    let lsOutput = ''
    const options = {
      listeners: {
        stdout: (data) => {
          lsOutput += data.toString()
        }
      }
    }

    await exec.exec('ls', ['-l'], options)
    core.info(`lsOutput:\n${lsOutput}`)

    core.endGroup()

    core.startGroup('@actions/glob')

    const patterns = ['**.txt', '**/*test*']
    const globber = await glob.create(patterns.join('\n'))

    for await (const file of globber.globGenerator()) {
      core.info(file)
    }

    core.endGroup()
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
