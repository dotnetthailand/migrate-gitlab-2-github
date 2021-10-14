# Migrate from GitLab to GitHub

setup script as `settings.ts`

```ts
import Settings from './src/interfaces/Settings';

export default {
  gitlab: {
    groupName: 'Source groupName',
    username: '',
    password: ''
  },
  github: {
    orgName: 'Target Org Name',
    username: 'my-',
    password: ''
  },
  repositories: {
    'subgroup1': ['repo1'],
    'subgroup2': ['repo2','repo3']
  }
} as Settings;
```

# Usage 

```
yarn start
```

# Ref
https://github.com/piceaTech/node-gitlab-2-github

# To be support Git-LFS

```
sudo apt-get install git-lfs
```
