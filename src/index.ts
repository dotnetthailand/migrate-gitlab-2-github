import path from 'path';
import settings from '../settings';
import GitLabHelper from './libs/GitLabHelper';
import { run } from './libs/utility';

const tmpDir = 'tmp';

async function main(){
  const gitlab = new GitLabHelper(settings)
  await gitlab.verifySettings();
  const { groupName, username, password } = settings.gitlab;
  const { repositories } = settings;
  // const url = gitlab.privateRepoURLs[0];
  await run(`mkdir -p ${tmpDir}`);

  for (const subGroupName in repositories) {
    for(const repoName of repositories[subGroupName]){
      const targetURL = GitLabHelper.composePrivateRepoURL({
        groupName,
        subGroupName,
        repoName,
        username,
        password
      });
      await run(`git clone --progress --verbose --mirror ${targetURL} ${path.join(tmpDir, subGroupName, `${repoName}.mirror`)}`);
    }
  }


// # Change into newly created repo directory
// cd git-migration-demo.git

// # Push to GitHub using the `--mirror` option.  The `--no-verify` option skips any hooks.
// git push --no-verify --mirror $DESTINATION_ACCESS
}

// console.log(`Run with ${JSON.stringify(settings)}`);
main();
