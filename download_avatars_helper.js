const request = require('request');
const fs = require('fs');
require('dotenv').config();

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

module.exports = {
  getRepoContributors: function(repoOwner, repoName, cb) {
    console.log('Welcome to the GitHub Avatar Downloader!');

    const GITHUB_USER = process.env.GITHUB_USER;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    // the main function to fetch the contributors avatar
    const requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN +
    '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
    // set options
    var requestOptions = {
      url: requestURL,
      headers: {'user-agent': 'GitHub Avatar Downloader - Student Project'}
    };

    request(requestOptions, cb);
  },

  printImage: function(err, response, body){
    console.log('It starts downloading...');
    if (err) { throw(err); }

    body = JSON.parse(body);

    const [urlFile, pathFile] = makePath(body);
    // handle error if repo is not found
    if (body.message === 'Not Found') {
      throw new Error('Your Repo is not found!');
    }
    // handle error if credential is not valid
    if (body.message === 'Bad credentials') {
      throw new Error('Credential is not valid!');
    }

    // download them
    for (let i = 0; i < body.length; i++) {
      downloadImageByURL(urlFile[i], pathFile[i]);
    }
    console.log("Congratulations! It's done!");
  }
};