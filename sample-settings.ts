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
