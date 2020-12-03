let [url, path] = process.argv.slice(2);
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let fs = require('fs');
const request = require('request');

request(url, (error, response, body) => {
  if (error || response === undefined || response.statusCode !== 200) {
    console.log("Bad URL");
    process.exit();
  } else if (path === undefined) {
    console.log("Invalid local path")
    process.exit();
  } else {
    if(!fs.existsSync(path)) {
      fs.writeFile(path, body, error => {
        if (error) throw error;
        console.log(`Download and saved ${body.length} byte to ${path}`)
      })
    } else if (fs.existsSync(path)) {
      rl.question('Do you want to override the file? Press "y" if you do ... ', key => {
        if (key === 'y') {
          fs.writeFile(path, body, error => {
            if (error) throw error;
            console.log(`Download and saved ${body.length} byte to ${path}`)
            rl.close();
          })
        } else {
          console.log('Y not pressed...Not saved... goodbye')
          rl.close();
        }
      })
    }
  }
});