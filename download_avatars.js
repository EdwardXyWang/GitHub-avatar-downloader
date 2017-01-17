var request = require('request');
var fs = require('fs');
// Use the request module
var GITHUB_USER = "EdwardXyWang";
var GITHUB_TOKEN = "99d0794799453d96f02d40a551f3b97650f7cf8a";
// store token as globle environment variable, call <$gitapil> to show
var repoOwner = process.argv[2];
var repoName = process.argv[3];
// get repo owner and repo name
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // the main function to fetch the contributors avatar
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN +
  '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // set options
  var requestOptions = {
    url: requestURL,
    headers: {'user-agent': 'GitHub Avatar Downloader - Student Project'}
  };

  request(requestOptions, cb);
}

function printImage(err, response, body){
  body = JSON.parse(body);
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
