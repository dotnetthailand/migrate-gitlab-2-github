export default interface Settings {
  debug?: boolean;
  gitlab: GitlabSettings;
  github: GithubSettings;
  // Subgroup Name : ['repo1', 'repo2']
  // Case-Sensitive
  repositories: Record<string, string[]>
}

export interface GitlabSettings {
  groupName: string;
  username: string;
  password: string;
}

export interface GithubSettings {
  orgName: string;
  username: string;
  password: string;
}

