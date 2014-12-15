# Dummy donkey

# Get involved in development
## Setup env
### Mac/*inx
- install *git* and clone the appropriate branch
 - ```git clone --branch master https://github.com/DDonkey/ddonkey.github.io.git```
- install *node*
 - `brew install node`
- launch terminal and install the following packages in the global space: *grunt-cli*, *bower*
 - `npm install -g grunt-cli`
 - `npm install -g bower`
- inside the local folder of source repositry run *npm* to install everything we need
 - `npm install`
- You can run grunt tasks and do development as usual.

### Grunt task
- `grunt serve`
 - Build the source code using development settings and start the HTTP server for debugging.
 - You can access http://localhost:9000 and enjoy your debugging.
- `grunt build`
 - Build the source code using production settings and generate bits for deployment
 - All css and js files are merged and minified

# Credit
- The whole grunt world
