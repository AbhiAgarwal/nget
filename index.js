var program = require('commander');
var fs = require('fs');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
  if(error){
    console.log(error);
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
    console.log(GithubPath);
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