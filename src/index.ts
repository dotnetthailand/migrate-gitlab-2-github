import path from 'path';
import fs, { write } from 'fs';
import { promisify } from 'util';
import { stripIndent } from 'common-tags';
import settings from '../settings';
import GitLabHelper, { IGitLabRepoInfo } from './libs/GitLabHelper';
import GitHubHelper from './libs/GitHubHelper';
import { run } from './libs/utility';
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const defaultUnicode = 'utf8';
const tmpDir = 'tmp';

interface IBashScriptParams {
  source: {
    URL: string;
    repoInfo: IGitLabRepoInfo;
  }
  target: {
    URL: string;
    repo: string;
  }
}

const generateBashScriptFilename = (subGroupName: string, repoName: string) => `${subGroupName}-${repoName}.sh`;
const generateBashScript = ({
  source, target
}: IBashScriptParams) => (
  stripIndent`
    #!/usr/bin/bash
    echo "Starting git remote migration";
    git clone --progress --verbose --mirror ${source.URL} ${path.resolve(tmpDir, source.repoInfo.subGroupName || '', `${source.repoInfo.repoName}.mirror`)}
    gh auth login --with-token < ${path.resolve(tmpDir, 'github-token.txt' )}
    gh auth status
    cd ${path.resolve(tmpDir, source.repoInfo.subGroupName || '', `${source.repoInfo.repoName}.mirror`)}
    gh repo create ${target.repo} --private -y
    git push --no-verify --mirror ${target.URL}
  `
)

// Mock mode is not affect with remote repo.
let MOCK_MODE = false;
const firstArg = process.argv[2];
if(firstArg === 'mock'){
  MOCK_MODE = true;
}

console.log(`Running migrate-gitlab-2-github [mode] MOCK_MODE: ${MOCK_MODE}`);

async function main(){
  const gitlab = new GitLabHelper(settings)
  await gitlab.verifySettings({ mockMode: true });
  const { groupName, username, password } = settings.gitlab;
  const { repositories } = settings;
  const { github } = settings;
  await run(`mkdir -p ${tmpDir}`);
  await writeFile(path.resolve(tmpDir, 'github-token.txt'),
    github.password, defaultUnicode);

  console.log('Starting... migration to target Git remote')
  for (const subGroupName in repositories) {
    for(const repoName of repositories[subGroupName]){
      const sourceURL = GitLabHelper.composePrivateRepoURL({
        groupName,
        subGroupName,
        repoName,
        username,
        password
      });
      const targetRepoName = `${github.orgName}/${subGroupName}-${repoName}`;
      console.log(GitHubHelper.composeRepoURL({
        repoLocation: targetRepoName
      }))
      await writeFile(
        path.resolve(tmpDir, generateBashScriptFilename(subGroupName, repoName)),
        generateBashScript({
          source: {
            URL: sourceURL,
            repoInfo: {subGroupName, repoName},
          },
          target: {
            URL: GitHubHelper.composePrivateRepoURL({
              repoLocation: targetRepoName,
              username: github.username,
              password: github.password,
            }),
            repo: targetRepoName
          }
        }),
        defaultUnicode);
      await run(`chmod a+x ${path.resolve(tmpDir, generateBashScriptFilename(subGroupName, repoName))}`, MOCK_MODE);
      if(!MOCK_MODE)
        await run(path.resolve(tmpDir, generateBashScriptFilename(subGroupName, repoName)));;
    }
  }
}

// console.log(`Run with ${JSON.stringify(settings)}`);
main();
