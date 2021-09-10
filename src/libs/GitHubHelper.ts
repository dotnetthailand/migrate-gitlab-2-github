import Settings from '../interfaces/Settings';
import RemoteGitHelper from './RemoteGitHelper';
import fetch from 'isomorphic-fetch';

export default class GitHubHelper extends RemoteGitHelper {

  constructor(protected _settings: Settings){
    super(_settings);
  }

  async verifySettings() {

  }

}

