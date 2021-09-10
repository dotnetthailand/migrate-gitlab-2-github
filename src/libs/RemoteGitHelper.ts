import Settings from "../interfaces/Settings";

export default class RemoteGitHelper {

  protected _debug: boolean;

  constructor(protected _settings: Settings){
    this._debug = this._settings.debug || false;
  }

  async verifySettings() {}

}
