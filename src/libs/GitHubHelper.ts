import Settings from '../interfaces/Settings';
import RemoteGitHelper from './RemoteGitHelper';
import fetch from 'isomorphic-fetch';

interface IGithubRepoInfo {
  username?: string;
  password?: string;
  repoLocation?: string; // e.g. org/repoName
}

export default class GitHubHelper extends RemoteGitHelper {

  constructor(protected _settings: Settings){
    super(_settings);
  }

  async verifySettings() {

  }

  public static composePrivateRepoURL(repoInfo: IGithubRepoInfo) {
    const { repoLocation, username, password } = repoInfo;
    return `https://${username}:${password}@github.com/${repoLocation}.git`;
  }

  public static composeRepoURL(repoInfo: IGithubRepoInfo) {
    const { repoLocation, username, password } = repoInfo;
    return `https://github.com/${repoLocation}.git`;
  }
}

