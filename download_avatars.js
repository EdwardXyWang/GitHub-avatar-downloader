const request = require('request');
const fs = require('fs');
const ENV = require('dotenv').config();
// Use the request module
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// store token as globle environment variable, call <$gitapil> to show
const repoOwner = process.argv[2];
const repoName = process.argv[3];
// get repo owner and repo name
if (process.argv.length !== 4) {
  throw new Error('Plesse input the right format: repoOwner repoName');
}
// set the warning when the input arguments are not legal
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // the main function to fetch the contributors avatar
  const requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN +
  '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // set options
  var requestOptions = {
    url: requestURL,
    headers: {'user-agent': 'GitHub Avatar Downloader - Student Project'}
  };

  request(requestOptions, cb);
}

function printImage(err, response, body){
  if (err) { throw(err); }
  body = JSON.parse(body);
  // convert the string body to object body
  var urlFile = [];
  var pathFile = [];
  // Store urlFile and pathFile
  for (var i = 0; i < body.length; i++) {
    urlFile[i] = body[i]['avatar_url'];
    pathFile[i] = './avatars/' + body[i]['login'] + '.jpg'
  };
  // download them
  for (var i = 0; i < body.length; i++) {
    downloadImageByURL(urlFile[i], pathFile[i]);
  };
};

// store the images
function downloadImageByURL(url, filePath) {
  request.get(url).on('error', function(err) {throw(err);})
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, printImage);
