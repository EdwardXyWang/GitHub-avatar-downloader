const avatarHelper = require('./download_avatars_helper.js');

const repoOwner = process.argv[2];
const repoName = process.argv[3];

// set the warning when the input arguments are not legal
if (process.argv.length !== 4) {
  throw new Error('Plesse input the right format: repoOwner repoName');
}

try {
  avatarHelper.getRepoContributors(repoOwner, repoName, avatarHelper.printImage);
} catch (err) {
  console.log('Error: ', err);
}
