### Build Your Own Text Based Adventure Game With Javascript

This project aims to provide a basic starting point for a a text based adventure game. You should have everything you need to get started customizing your own game while getting some practice working with Javascript.
 
To play the game load index.html in a browser. The game uses a terminal or command line type interface. You enter commands to move around and interact with the game. You can use up and down arrow keys to cycle through history of commands.
 
Some things you can customize:
* ####map 
    Edit map.csv in a spreadsheet application. Load up map_converter.html in your browser and copy the data out of the spreadsheet and paste it into the left box on the page. Click the convert button and copy the resulting map declaration out of the right text box. Paste it into the bottom of map.js where the comments indicate.

* ####tiles
    Add and change tile declarations in tiles.js. You can declare new tiles in this file and then use them on the map. Tiles must contain a description and a look property, these can be strings or functions that return strings. "Out of the box" tiles can optionally contain declarations for actions, enemies, and items. If you wanted, you could add other types of things to tiles and implement their functionality.

* ####commands
    Commands are the primary interface that our user will use to *do* things in our game. You can add or change the declaration of commands in the commands.js file. If you got really creative you could even implement some commands to make some different "type" of text based game other than walking around in map "adventure" style.
     
* ####items
    Items presence in a location gets declared in tiles.js. The item stats and behavior is declared in items.js. "Out of the box" the items only contain some text and a damage stat. You could implement other stats, or some different interesting behaviors if you wanted.
    
* ####player
    The player stats are declared in player.js. You could add or change stats in this file or implement some other interesting behaviors. "Out of the box" the player object tracks experience points but the game doesn't ever really do anything with them. Maybe you could implment some system that allows the player to use the experience points to skill or or gain other benefits. 