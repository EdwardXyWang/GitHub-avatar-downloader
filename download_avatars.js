const request = require('request');
const fs = require('fs');
require('dotenv').config();

const repoOwner = process.argv[2];
const repoName = process.argv[3];

const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// set the warning when the input arguments are not legal
if (process.argv.length !== 4) {
  throw new Error('Plesse input the right format: repoOwner repoName');
}

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
  console.log('It starts downloading...');
  if (err) { throw(err); }

  body = JSON.parse(body);

  const [urlFile, pathFile] = makePath(body);

  // download them
  for (let i = 0; i < body.length; i++) {
    downloadImageByURL(urlFile[i], pathFile[i]);
  }
  console.log("Congratulations! It's done!");
}

// Store urlFile and the saving path
function makePath(body) {
  let urlFile = [];
  let pathFile = [];
  // if folder ./avatars does not exist, create one
  if (!fs.existsSync('./avatars')) {
    fs.mkdirSync('./avatars');
  }
  for (let i = 0; i < body.length; i++) {
    urlFile[i] = body[i].avatar_url;
    pathFile[i] = './avatars/' + body[i].login + '.jpg';
  }
  return [urlFile, pathFile];
}

// store the images
function downloadImageByURL(url, filePath) {
  request.get(url).on('error', function(err) {throw(err);})
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, printImage);
