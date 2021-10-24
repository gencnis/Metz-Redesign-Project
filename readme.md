# Metz Re-Design Programming

## Javascript
All Javascript Soruce Files are in the ./js folder, all js files that are unique to a specific HTML file are named the name of the html file. IE, index.html & index.js

Utility Files:
- globals.js
- partials.js

These files exist to make development easier. Partials I wrote to provide the ability to dynamically inject html into another file. An example of that in use is in the **index.html** file, where ``<partial path="nav"></partial>`` is being used. This looks inside the folder ./partials for the "nav.html" file, and inserts it into the index.html file at that position.

Globals is just for javascript that should be included at the start of every html file regardless.

## CSS
The CSS source files are in the ./css folder, following the same naming scheme as the JavaScript. Colors contains a list of all the colours that are in the 'colors' dropdown in the prototype (plus blue4point5 which wasn't included, but that's the color the buttons are)

## HTML
All HTML page files are in the root level of the project directory, named whatever the page relates to.

# TODO:
- Make the Main Page
- ~~Make the Meal Plan Page~~ Done
- ~~Make the Menu Page~~ Done
- Make the About-Us Page
- Make the Boars Head Page
- Fix Menu Card Resizing in Menu Page
- Add popups for menu items
- Add popups for calander
- Create popup for sign-in
- Add the pictures and assets to the assets/images/food directory