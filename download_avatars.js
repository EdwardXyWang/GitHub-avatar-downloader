var request = require('request');
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
  request(requestOptions, function(err, response, body){
    console.log('body is:', body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

