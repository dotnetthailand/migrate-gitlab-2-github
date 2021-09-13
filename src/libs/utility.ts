import { promisify } from 'util';

// https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7
// const exec = promisify(require('child_process').exec);
// https://stackoverflow.com/questions/10232192/exec-display-stdout-live
const { spawn } = require('promisify-child-process');

export async function run(command: string) {
  try {
    const commandSplits = command.split(' ');
    const spawnCommand = commandSplits[0];
    const spawnArgs = commandSplits.slice(1);
    console.debug(`Executing... ${command}`);
    const childProcess = spawn(spawnCommand , spawnArgs, {encoding: 'utf8', maxBuffer: 200 * 1024} );

    childProcess.stdout.on('data', function (data: any) {
      console.log('stdout: ' + data.toString());
    });

    childProcess.stderr.on('data', function (data: any) {
      console.log('stderr: ' + data.toString());
    });

    childProcess.on('exit', function (code: any) {
      console.log('child process exited with code ' + code);
    });

    const { stdout, stderr, code } = await childProcess;

  } catch (err) {
    console.error(err);
  };
}
