import Settings from '../interfaces/Settings';
import RemoteGitHelper from './RemoteGitHelper';
import fetch from 'isomorphic-fetch';

export default class GitLabHelper extends RemoteGitHelper {

  constructor(protected _settings: Settings){
    super(_settings);
  }

  async verifySettings() {
    const { groupName } = this._settings.gitlab;
    const { repositories } = this._settings;
    try{
      for (const subGroupName in repositories) {
        for(const repo of repositories[subGroupName]){
          const targetURL = this.composeRepoURL(groupName, subGroupName, repo);
          // console.debug(status, response.body);
         console.log(targetURL);
        }
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  composeRepoURL(groupName: string, subGroupName: string, repoName: string) {
    return `https://gitlab.com/${groupName}/${subGroupName}/${repoName}`;
  }
}

