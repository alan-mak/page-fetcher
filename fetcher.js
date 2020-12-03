let [url, path] = process.argv.slice(2);
let directory = './';

let fs = require('fs');
const request = require('request');

request(url, (error, response, body) => {
  if (error) {
    console.log(error);
    return;
  }
  if (!fs.existsSync(path)) {
    // fs.createWriteStream(directory + path, {flags: 'w',encoding: 'utf8'})
    fs.writeFile(directory + path, body, error => {
      if (error) throw error;
      console.log(`Download and saved ${body.length} byte to ${path}`)
    })
    // console.log(Buffer.byteLength(body))
  } else {

  }
});