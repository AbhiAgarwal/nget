var program = require('commander');
var Git = require("nodegit");
var fs = require('fs');
var mkdirp = require('mkdirp');
var Q = require('q');

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
            process.env.NgetPATH + "src/" + splitArray[0].toLowerCase() + "/" + splitArray[1].toLowerCase() + "/" + splitArray[2].toLowerCase();
        var GithubPath =
            "https://" + splitArray[0].toLowerCase() + "/" + splitArray[1].toLowerCase();
        try {
            if (fs.existsSync(NgetPath)) {
                console.log("Directory already exists!");
                return
            }
        } catch (e) {
            console.log(e);
            return
        }
        mkdirp(NgetPath);
        Git.Clone(GithubPath, NgetPath, {ignoreCertErrors: 1})
          .then(function(repository) {
            console.log(repository);
          });
    } else {
        program.help();
    }
}