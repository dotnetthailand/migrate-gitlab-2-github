import Settings from '../interfaces/Settings';
import RemoteGitHelper from './RemoteGitHelper';
import fetch from 'isomorphic-fetch';

export interface IGitLabRepoInfo {
  groupName?: string;
  subGroupName?: string;
  repoName?: string;
  username?: string;
  password?: string;
}
export default class GitLabHelper extends RemoteGitHelper {

  // public privateRepoURLs: string[] = [];

  constructor(protected _settings: Settings){
    super(_settings);
  }

  async verifySettings() {
    const { groupName, username, password } = this._settings.gitlab;
    const { repositories } = this._settings;
    const workers = [];
    const urls = [];
    try{
      for (const subGroupName in repositories) {
        for(const repoName of repositories[subGroupName]){
          const targetURL = GitLabHelper.composePrivateRepoURL({
            groupName,
            subGroupName,
            repoName,
            username,
            password
          });
        workers.push(fetch(targetURL));
        // this.privateRepoURLs.push(targetURL);
        urls.push(GitLabHelper.composeRepoURL({ groupName, subGroupName, repoName}));
        }
      }

      const responses = await Promise.all(workers);
      for(const index in responses){
         if(responses[index].status === 200){
           console.log(`${urls[index]} [OK]`);
         } else {
          console.log(`${urls[index]} [FAILED]`);
         }
      }

    } catch (error) {
      throw new Error(error as string);
    }

  }

  public static composePrivateRepoURL(repoInfo: IGitLabRepoInfo) {
    const { groupName, subGroupName, repoName, username, password } = repoInfo;
    return `https://${username}:${password}@gitlab.com/${groupName}/${subGroupName}/${repoName}.git`;
  }

  public static composeRepoURL(repoInfo: IGitLabRepoInfo) {
    const { groupName, subGroupName, repoName} = repoInfo;
    return `https://gitlab.com/${groupName}/${subGroupName}/${repoName}`;
  }
}

