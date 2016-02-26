# ShoppingList

This is a sample application that makes use of Angular2 for Typescript and Hood.ie!
Hoodie is a frontend abstraction of a generic backend web service.

 <http://hood.ie>

## Set-Up:

### Get the prerequisites:

##### 1. [node.js](https://nodejs.org/en/)
     sudo add-apt-repository ppa:chris-lea/node.js
     sudo apt-get update
     sudo apt-get install nodejs

##### 2. [bower](http://bower.io/) & [gulp](http://gulpjs.com/)
    npm install bower -g
    npm install gulp -g

##### 3. [couchdb](http://couchdb.apache.org/)
     sudo apt-get update
     sudo apt-get install couchdb-bin git

##### 4. [hoodie-cli](http://hood.ie)
     npm install -g hoodie-cli

##### 5. [cordova](https://cordova.apache.org/)
     npm install -g cordova

##### 6. cordova plugins
        cordova plugin add cordova-plugin-statusbar

### Initialization:
##### Install/update modules:
     dev/update_libs.sh
##### add mobile platform:
    cordova platform add android

## Development

##### Start Webapplication (<http://localhost:9999>):
      dev/start.sh

##### Start mobile application:
      cordova run android

## screenshots:
![Screenshots](https://github.com/SimonWolf/ShoppingList-Hoodie/blob/master/assets/images/frame.png?raw=true "Screenshots")