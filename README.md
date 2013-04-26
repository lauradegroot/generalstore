# General Store

## What it is

A 2D adventure game maker.

## Install for users

You want to use generalstore to create a game? Here's what you need
to do:

1. Install [node](http://nodejs.org)
2. Clone the repository

   > git clone git://github.com/ednapiranha/generalstore.git

   > cd generalstore

   > cp local.json-dist local.json

   > npm install

3. Create `generalstore/media/js/local_settings.js` and paste the following:

        define([],
           function () {

           'use strict';

           return {
              DEBUG: true
           };
        });

4. Make sure `generalstore/media/js/templates.js` only has the following:

        define(function() {});

5. Download [nunjucks-dev.js](https://raw.github.com/jlongster/nunjucks/master/browser/nunjucks-dev.js) and save it to `generalstore/media/js/lib/nunjucks.js`


## Install for contributors

You want to get set up to hack on generalstore and contribute patches?
Here's what you need to do:

1. Everything in "Install for users"


## Writing stories

### Setting up game dimensions

> cd generalstore/config

> cp defaults.json-dist defaults.json

Edit the `width` and `height` values in defaults.json.

If you don't want level descriptions to display in the game, set `showDescription` to false.


### Running in development

To run the app in development, do:

> node app.js


### A note about assets

Character and item images can have any file extension (jpg, png, gif) as long as you specify it in your stories/*.txt files.

The only limitation is that inventory assets must have a png extension.


### Setting up stories

> cd stories

Edit stories in a text editor with the following format:

    level
    1

    location
    A crazy party hut

    background_image
    partyhut.jpg

    description
    This is the party hut!

    character
    name: partybear
    image: partybear.png
    left: 100
    top: 400
    requires: false
    gives: mango
    first_says: Hey there, here is a mango!
    finally_says: I already gave you a mango!

    item
    name: car
    image: car.gif
    left: 500
    top: 400
    requires: mango
    gives: gas
    levels_up_to: 2

All character and item level and name properties are used to generate a unique id. E.g. A level 1 character with the name 'bunny' generates a unique id of 1-bunny.

Every story file starts with:

* level - The level that this file represents. You can only have one unique level per file.
* location - The location name of the level
* background_image - The image used in the level's main background. If this is a png or gif, replace the extension.
* description - An optional description of the location; write 'false' as the content if you want it to be empty. You can also configure generalstore/config/defaults.json to never show descriptions.

Story files can contain zero or more characters and items.

**character**

Contains the properties for each character. All properties are mandatory.

* character name - Name of the character.
* character image - Filename of the character image. Save the file in `generalstore/media/images/characters/`.
* character left - Position of the character from the left. Set your game dimensions in generalstore/config/defaults.json
* character top - Position of the character from the top.
* character requires - If an inventory object is needed to be given to the character before an initial interaction is triggered, enter it here. Otherwise, write 'false'.
* character gives - This is what the character gives to the player after initial interaction. If nothing needs to be given, write 'false'.
* character first_says - This is what the character first says to the player on initial interaction.
* character finally_says - This is what the character says on subsequent interactions.

**item**

Contains the properties for each item. All properties are mandatory.

* item name - Name of the item. The level and name generate a uniqud id and this will dobule as your item's image filename.
* item image - Filename of the item image. Save the file in `generalstore/media/images/items/`.
* item left - Position of the item from the left.
* item top - Position of the item from the top.
* item requires - If an inventory object is needed to trigger an item's response (especially if there is a `gives` or `levels_up_to` set), enter it here. Otherwise, write 'false'.
* item gives - This is what the item provides the player either on initial interaction or if `requires` is fulfilled.
* item levels_up_to - If `requires` is fulfilled for the item, the scene will change to the level set here. Otheriwse, write 'false'.


### Generating files

Once you've completed your txt files, run [http://localhost:3000/generate](http://localhost:3000/generate) in your browser to regenerate the configuration.


## Packaging it up for production

Ready to deploy as a finished standalone package? Then do:

1. Minify files with Grunt in production

   > node_modules/grunt-cli/bin/grunt

2. Change `generalstore/media/js/local_settings.js` DEBUG to false.

3. Run the following to precompile the templates:

   > node_modules/nunjucks/bin/precompile generalstore/templates > generalstore/media/js/templates.js

4. Download [nunjucks.js](https://raw.github.com/jlongster/nunjucks/master/browser/nunjucks.js) and save it to `generalstore/media/js/lib/nunjucks.js`


You only need the contents within generalstore/generalstore (e.g. config/, media/, templates/, main.html).

After precompiling nunjucks to templates.js and minifying with grunt, main.html should work as is.

Note that you must run this on some kind of webserver and point to main.html as the default landing page.


## Running tests

> make test

and also

Load `generalstore/test/tests.html` in a browser
