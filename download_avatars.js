var request = require('request');
var fs = require('fs');
// Use the request module
var GITHUB_USER = "EdwardXyWang";
var GITHUB_TOKEN = "99d0794799453d96f02d40a551f3b97650f7cf8a";
// store token as globle environment variable, call <$gitapil> to show
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
  // get the body
  request(requestOptions, cb);
}

function printImage(err, response, body){
  body = JSON.parse(body);
  for (var i = 0; i < body.length; i++) {
    console.log(body[i]['avatar_url']);
  }
};

getRepoContributors("jquery", "jquery", printImage);





function downloadImageByURL(url, filePath) {
  request.get(url).on('error', function(err) {throw(err);})
    .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg")








