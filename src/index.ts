import settings from '../settings';
import GitLabHelper from './libs/GitLabHelper';


async function main(){
  const gitlab = new GitLabHelper(settings).verifySettings();

}

console.log(`Run with ${JSON.stringify(settings)}`);
main();
