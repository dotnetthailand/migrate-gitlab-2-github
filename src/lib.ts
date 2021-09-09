import { promisify } from 'util';

// https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7
const exec = promisify(require('child_process').exec);

export async function run(command: string) {
  try {
    const { stdout, stderr } = await exec(command);
    console.debug(`Executing... ${command}`);
    if (stdout) console.log('[out]:', stdout);
    if (stderr) console.error('[err]:', stderr);
  } catch (err) {
    console.error(err);
  };
}
