var program = require('commander');
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');

var puts = function (error, stdout, stderr) {
  if(error){
    console.log(error);
  }
}

var CheckAndmkdir = function(path){
  if (!fs.existsSync(path)) {
    try {
      fs.mkdirSync(path);
    } catch(e) {
      if ( e.code != 'EEXIST' ) throw e;
    }
  }
}

program
  .version('0.0.1')
  .usage('nget')
  .parse(process.argv);

if (!process.env.NgetPATH) {
  console.log("Please set your NgetPATH!");
  return
}

if (!program.args.length) {
  program.help();
  return
} else {
  // Check if src directory, etc. exist.
  CheckAndmkdir(process.env.NgetPATH + "/src");
  CheckAndmkdir(process.env.NgetPATH + "/src/github.com");
  // Get command
  if (program.args[0] == "get") {
    if (program.args.length == 1) {
      console.log("Please specify repository");
      return
    }
    var splitArray = program.args[1].split("/");
    var NgetPath =
        process.env.NgetPATH + "src/" + splitArray[0].toLowerCase() + "/" + splitArray[1].toLowerCase() + "/";
    var GithubPath =
        "https://" + splitArray[0].toLowerCase() + "/" + splitArray[1].toLowerCase() + "/" + splitArray[2].toLowerCase() + ".git";

    CheckAndmkdir(process.env.NgetPATH + "src/" + splitArray[0].toLowerCase());
    CheckAndmkdir(NgetPath);

    try {
        if (fs.existsSync(NgetPath + splitArray[2].toLowerCase())) {
            console.log("Directory already exists!");
            return
        }
    } catch (e) {
        console.log(e);
        return
    }
    exec("cd " + NgetPath + " && git clone " + GithubPath + " " + splitArray[2].toLowerCase(), puts);
  } else {
    program.help();
  }
}