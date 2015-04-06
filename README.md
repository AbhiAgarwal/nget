# nget

Node alternative of go get. Very basic version. The setup process isn't great as I spent 10 minutes making this script. Make the NgetPath directory and export it as a environment variable.

`export NgetPATH="/Users/<yourusername>/node/"`

Download this project and set up:

`export nget="node <path to project>/index.js"`

Then just run:

`nget get github.com/abhiagarwal/nget`

To make your life easier at this point you can switch your `nget` to:

`export nget="node $NgetPATH/src/github.com/abhiagarwal/index.js"`

Then you're able to use it!