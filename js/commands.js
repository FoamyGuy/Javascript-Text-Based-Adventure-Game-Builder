String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

var CMDS = {
  "help": function (command) {
    if (command === undefined) {
      var help_str = "Available commands:<br>";
      for (var i = 6; i < Object.keys(CMDS).length + 6; i++) {
        help_str += Object.keys(CMDS)[i - 6] + "&nbsp;&nbsp;&nbsp;&nbsp;";
        if (i % 5 == 0) {
          help_str += "<br>";
        }
        //console.log(Object.keys(CMDS)[i]);
      }
      help_str += "<br>";
      help_str += "<br>Try <span style='background-color: #444; border-radius: 4px;'>help [command]</span> to learn more about a specific command.<br><span class='dev-help'>Information printed in darkcyan is directed at you the practicing software developer, rather than you the player of the game, a bit like comments in your code.<br>This message, along with all of the other commands are defined in the CMDS object inside commands.js.</span>";
      output(help_str);
      //output("Available commands: <br>Try <span style='background-color: #444; border-radius: 4px;'>help [command]</span> to learn more about a specific command.<br><span class='dev-help'>Information printed in darkcyan is directed at you the practicing software developer, not you the player of the game.<br>This message, along with all of the other commands are defined in the CMDS object inside commands.js.</span>");
    } else if (command === "move") {
      output("Usage: <span class='syntax-highlight'>move [direction]</span><br>[direction] must be north, south, east, or west.<br>Attempts to move the player in the direction specified.<br><span class='dev-help'>See \"move\" inside of CMDS object in commands.js</span>");
    } else if (command === "cls") {
      output("Usage: <span class='syntax-highlight'>cls</span><br>Clears the output console.");
    } else if (command === "map") {
      output("Usage: <span class='syntax-highlight'>map</span><br>Prints a section of the map to the output console.<br>Legend:<br> # = Available space<br> P = Player location<br> . = Unavailable space<br><span class='dev-help'>See map.js for raw map data, and helper functions for drawing ascii map. Use map_converter.html import mat data copied out of spreadsheet.</span>");
    } else if (command === "look") {
      output("Usage: <span class='syntax-highlight'>look</span><br>Look around in the current tile to see if you can find anything interesting.<br><span class='dev-help'>The message printed is declared in tiles.js</span>");
    } else if (command === "take") {
      output("Usage: <span class='syntax-highlight'>take [item-name]</span><br>Try to take an item. If one is available in this area you'll pick it up.<br><span class='dev-help'>The items presence in a room is declared in tiles.js. You might want to include something in the look text to let the player know an item is available. Item stats are declared in items.js</span>");
    } else if (command === "equip") {
      output("Usage: <span class='syntax-highlight'>equip [item-name]</span><br>Try to equip an item. If you have the specified item it will get equiped so you can use it for attacking.<br><span class='dev-help'>See commands.js 'attack' for how combat works. Item stats are declared in items.js</span>");
    } else if (command === "attack") {
      output("Usage: <span class='syntax-highlight'>attack</span><br>Try to attack an enemy in this area. If there is an enemy the game will simulate one round of combat.<br><span class='dev-help'>See how combat works in commands.js 'attack'. Enemies are declared in tiles.js.</span>");
    } else if (command === "playerinfo") {
      output("Usage: <span class='syntax-highlight'>playerinfo</span><br>Output the player stats.<br><span class='dev-help'>Player stats are declared in player.js.</span>");
    }else if (command === "inventory") {
      output("Usage: <span class='syntax-highlight'>inventory</span><br>Output details of each item in the player inventory.<br><span class='dev-help'>Item stats are declared in items.js. Player inventory is a list on the PLAYER object in player.js.</span>");
    } else {
      output("Sorry, there is no help text for " + command);
    }

  },
  "take": function (item) {
    if (getTile(CUR_LOC).hasOwnProperty("items")) {
      console.log(getTile(CUR_LOC)['items']);
      if (getTile(CUR_LOC)['items'].indexOf(item) >= 0) {
        output("Player took " + item);
        PLAYER.inventory.push(item);
        getTile(CUR_LOC)['items'].splice(getTile(CUR_LOC)['items'].indexOf(item), 1);
      } else {
        output("There is no " + item + " here.");
      }
    } else {
      output("There are no items in this area.");
    }
  },
  "inventory": function () {
    inv_str = "";
    for (var i = 0; i < PLAYER.inventory.length; i++) {
      inv_str += ITEMS[PLAYER.inventory[i]].name + "<br>" +
        "Damage: " + ITEMS[PLAYER.inventory[i]].damage + "<br>" +
        ITEMS[PLAYER.inventory[i]].description + "<br>";

      if (i < PLAYER.inventory.length - 1) {
        inv_str += "------<br>";
      }


    }
    output(inv_str);
  },
  "equip": function (item) {
    if (PLAYER['inventory'].indexOf(item) >= 0) {
      output("Player equipped " + item);
      PLAYER.equipped_item = item;
    } else {
      output("You don't have " + item + ".");
    }
  },
  "move": function (direction) {
    function checkDirection(x, y) {
      var possible_new_loc = {x: CUR_LOC.x + x, y: CUR_LOC.y + y};
      var possible_new_space = getTile(possible_new_loc);

      console.log("(" + possible_new_loc.x + ", " + possible_new_loc.y + "): " + possible_new_space);
      if (possible_new_space !== "") {
        return true;
      }
      return false;
    }

    var valid_params = ["east", "west", "south", "north"];

    if (getTile(CUR_LOC).hasOwnProperty("enemy")) {
      if (getTile(CUR_LOC)["enemy"].isAlive()) {
        output("You can't move while the enemy is alive. You can only attack or retreat.");
        return;
      }

    }

    if ($.inArray(direction.toLowerCase(), valid_params) > -1) {
      //output("moving " + direction);
      if (direction === "south") {
        if (checkDirection(0, 1)) {
          CUR_LOC.y += 1;
          output("Moved " + direction + "<br>" + getDescription());
        } else {
          output("Cannot move " + direction)
        }
      } else if (direction === "east") {
        if (checkDirection(1, 0)) {
          CUR_LOC.x += 1;
          output("Moved " + direction + "<br>" + getDescription());
        } else {
          output("Cannot move " + direction)
        }
      } else if (direction === "north") {
        if (checkDirection(0, -1)) {
          CUR_LOC.y += -1;
          output("Moved " + direction + "<br>" + getDescription());
        } else {
          output("Cannot move " + direction)
        }
      } else if (direction === "west") {
        if (checkDirection(-1, 0)) {
          CUR_LOC.x += -1;
          output("Moved " + direction + "<br>" + getDescription());
        } else {
          output("Cannot move " + direction)
        }
      }
    } else {
      output("Unknown direction " + direction);
    }
  },
  "map": function () {
    var startX = CUR_LOC.x - 3;
    var startY = CUR_LOC.y - 3;
    if (startX < 0) {
      startX = 0;
    }
    if (startY < 0) {
      startY = 0;
    }
    output(generateMapAscii(startX, startY, 7).replaceAll("\n", "<br>"));
  },
  "look": function () {
      if (getTile(CUR_LOC).hasOwnProperty("look")) {
        output(getTile(CUR_LOC).look);
        return;
      }
    output("Nothing to see");
  },
  "attack": function () {
    var output_str = "";
    if (getTile(CUR_LOC).hasOwnProperty("enemy")) {
      if (getTile(CUR_LOC)["enemy"].isAlive()) {
        if (getTile(CUR_LOC)["enemy"]["speed"] > PLAYER["speed"]) {
          PLAYER.health -= getTile(CUR_LOC)["enemy"]["damage"];
          getTile(CUR_LOC)["enemy"]["health"] -= PLAYER.get_adjusted_damage();
          output_str += getTile(CUR_LOC)["enemy"]["name"] + " hit player and did " + getTile(CUR_LOC)["enemy"]["damage"] + " damage.<br>Player struck back for " + PLAYER.get_adjusted_damage() + " damage.<br>";
        } else {
          getTile(CUR_LOC)["enemy"]["health"] -= PLAYER.get_adjusted_damage();
          output_str += "Player hit " + getTile(CUR_LOC)["enemy"]["name"] + " for " + PLAYER.get_adjusted_damage() + ".<br>";
          if (getTile(CUR_LOC)["enemy"].isAlive()) {
            PLAYER.health -= getTile(CUR_LOC)["enemy"]["damage"];
            output_str += getTile(CUR_LOC)["enemy"]["name"] + " struck back for " + getTile(CUR_LOC)["enemy"]["damage"] + ".<br>";

          }
        }
        if (!getTile(CUR_LOC)["enemy"].isAlive()) {

          PLAYER.experience += getTile(CUR_LOC)["enemy"]["experience"];
          output_str += getTile(CUR_LOC)["enemy"]["name"] + " is defeated.<br>Player gains " + getTile(CUR_LOC)["enemy"]["experience"] + " experience.";
        } else {
          output_str += "Player Health: " + PLAYER.health + "<br>" + "Enemy Health: " + getTile(CUR_LOC)["enemy"]["health"];
        }
        output(output_str);
      } else {
        output("Enemy was already defeated");
      }
    } else {
      output("There is no enemy here.");
    }
  },
  "playerinfo": function () {
    output(
      "Player<br>" +
      "Experience: " + PLAYER.experience + "<br>" +
      "Speed: " + PLAYER.speed + "<br>" +
      "Damage: " + PLAYER.damage + "<br>" +
      "Current Health: " + PLAYER.health + "<br>" +
      "Max Health: " + PLAYER.max_health + "<br>" +
      "Inventory: " + PLAYER.get_inventory_str());
  },
  "cls": function () {
    $output_container.empty();
  }
};