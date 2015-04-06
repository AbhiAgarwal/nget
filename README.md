# nget

Node alternative of go get. Very basic version. The setup process isn't great as I spent 10 minutes making this script. Make the NgetPath directory and export it as a environment variable.

I'll fix some of this setup processes in the future.

`export NgetPATH="/Users/<yourusername>/node/"`

Download this project and set up:

`npm install`

`node index.js get github.com/abhiagarwal/nget`

To make your life easier at this point you can switch your `nget` to:

`alias nget="node $NgetPATH/src/github.com/abhiagarwal/index.js"`

You can append this in your `~/.aliases` or `~/.bash_profile`

Then you're able to use it!