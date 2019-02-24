TILES = {
  "starting room": {
    "description": "You're on a dimly lit cobblestone path in a forrest. You have no recollection about how you arrived here, but you do feel the urge to find a way out. Try the <span class='syntax-highlight'>help</span> command to learn what other commands are available.",
    "look": "There is nothing interesting in this vicinity."
  },
  "path": {
    "description": "You're on a dimly lit cobblestone path.",
    "look": "There is nothing interesting in this vicinity."
  },
  "fancy room": {
    "description": "There is a black and white checkerboard dance floor covering a big chunk of the center of this room. ",
    "look": "There are some groovy tunes playing. A few people are already getting down, some others are taking a rest along the edges of the room. Are you in the mood to <span class='syntax-highlight'>dance</span>",
    "actions": {
      "dance": function () {
        output("You can't resist the urge so you throw down some slick moves. A few people take notice and look impressed.");
      }
    }
  },
  "stick room": {
    "description": "A medium sized sits next to the path. At it's base you spot a nice looking stick.",
    "look": "The stick looks like it might make a decent makeshift weapon maybe we should take it?",
    "items": ["stick"]
  },
  "rock room": {
    "description": "This section of path leads through a small mountainous area. Next to the path you spot a smooth rock that looks like it'll fit nicely in your hand.",
    "look": "The rock looks like it might make a decent makeshift weapon maybe we should take it?",
    "items": ["rock"]
  },
  "small monster room": {
    "enemy": {
      "name": "Small Monster",
      "speed": 66,
      "damage": 4,
      "health": 12,
      "experience": 20,

      "isAlive": function () {
        return this.health > 0;
      }
    },
    "description": function () {
      console.log(this);
      if (this.enemy.isAlive()) {
        return "As you enter the room a monster takes notice and begins following you with it's gaze.";
      } else {
        return "The room feels much less unsettling now that you've defeated the monster.";
      }
    },

    "look": function () {
      console.log(this);
      if (this.enemy.isAlive()) {
        return "You have the uneasy feeling of being watched.";
      } else {
        return "You defeated the " + this.enemy.name + " here.";
      }

    }

  },
  "healing fountain": {
    "description": "There is a large fountain with glowing light blue fluid pumping vibrantly out and splashing down in the collection pool bellow. There are a few other folks milling about filling small vessels with the liquid and drinking it.",
    "look": "You notice a few of the people drinking the liquid seem to be nursing injuries, shortly after taking a drink the seem to be healed by some mystical force. Maybe you should try to <span class='syntax-highlight'>drink</span> some",
    "actions": {
      "drink": function () {
        output("You cup your hands and slide them under one of the streams shooting out of the fountain. Tilting your head back you down the liquid. Instantly a calming coolness washes over you. You can feel your injuries recover.");
        PLAYER.health = PLAYER.max_health;
      }
    }
  },
};


function getDescription() {
  if (typeof getTile(CUR_LOC).description === "function") {
    return getTile(CUR_LOC).description();
  } else if (typeof getTile(CUR_LOC).description === "string") {
    return getTile(CUR_LOC).description;
  }
}
function getLook(tile) {
  console.log("getting look for " + tile);
  if (TILES.hasOwnProperty(tile)) {
    console.log("found tile");
    if (TILES[tile].hasOwnProperty('look')) {
      console.log("found look prop");
      if (typeof TILES[tile]['look'] === "function") {
        console.log("look is function");
        return TILES[tile]['look']();
      } else {
        console.log("look is not function");
        return TILES[tile]['look'];
      }
    }
  }
}