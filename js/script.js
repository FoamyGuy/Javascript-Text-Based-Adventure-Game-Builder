var $output_container = $("#output-container");
//var termynal = new Termynal('#termynal', { startDelay: 0 });
var $term_input = $(".term-input");
var prevoius_cmds = [];
var history_index = 0;

var START_LOC = {"x": 0, "y": 0};
var CUR_LOC = START_LOC;

$term_input.focus();

output(getTile(CUR_LOC).description);

function output(text) {
  $new_out = $('<p>');
  $new_out.html(text);
  $output_container.prepend($new_out);
}


function handleCommand(cmdStr) {
  var parts = cmdStr.split(" ");
  if (CMDS.hasOwnProperty(parts[0])) {
    var param = undefined;
    if (parts.length > 1) {
      param = parts[1];
    }
    CMDS[parts[0]](param);
    prevoius_cmds.unshift(cmdStr);
    $term_input.val("");
    return;
  }
  if (getTile(CUR_LOC).hasOwnProperty("actions")) {
    if (getTile(CUR_LOC)['actions'].hasOwnProperty(parts[0])) {
      getTile(CUR_LOC)['actions'][parts[0]]();

      prevoius_cmds.unshift(cmdStr);
      $term_input.val("");
      return;
    }
  }


  output("Unknown command: " + parts[0]);
  prevoius_cmds.unshift(cmdStr);
  $term_input.val("");


}

var VALID_COMMANDS = [];

function initValidCommands() {
  VALID_COMMANDS.push.apply(VALID_COMMANDS, Object.keys(CMDS));
  VALID_COMMANDS.push.apply(VALID_COMMANDS, Object.keys(ITEMS));
  VALID_COMMANDS.push.apply(VALID_COMMANDS, ['north', 'south', 'east', 'west']);
  actions = [];
  for (var i = 0; i < Object.keys(TILES).length; i++) {
    if (TILES[Object.keys(TILES)[i]].hasOwnProperty("actions")) {
      for (var j = 0; j < Object.keys(TILES[Object.keys(TILES)[i]].actions).length; j++) {
        var action = Object.keys(TILES[Object.keys(TILES)[i]].actions)[j];
        if (actions.indexOf(action) < 0) {
          actions.push(action);
        }
      }
    }
  }
  VALID_COMMANDS.push.apply(VALID_COMMANDS, actions);
}

var current_suggestions = [];
var current_suggestion_index = 0;
var tabCompletionUserInput = "";

function tabCompletion() {
  current_suggestions = [];
  var cur_text = $term_input.val();
  var cur_parts = cur_text.split(" ");
  var last_part = cur_parts[cur_parts.length - 1];
  console.log("last part: " + last_part);

  if (tabCompletionUserInput === "") {
    tabCompletionUserInput = last_part;
  }

  for (var i = 0; i < VALID_COMMANDS.length; i++) {
    //console.log(VALID_COMMANDS[i] + " - " + last_part);
    if (VALID_COMMANDS[i].startsWith(tabCompletionUserInput)) {
      current_suggestions.unshift(VALID_COMMANDS[i]);
    } else if (VALID_COMMANDS[i].indexOf(tabCompletionUserInput) > -1) {
      current_suggestions.push(VALID_COMMANDS[i]);
    }
  }

  if (current_suggestions.length > 0) {
    console.log(current_suggestions + "\n" + current_suggestion_index);
    cur_parts[cur_parts.length - 1] = current_suggestions[current_suggestion_index];
    $term_input.val(cur_parts.join(" "));
    if (current_suggestions.length > 1) {
      current_suggestion_index++;
      //console.log(current_suggestion_index + " - " + current_suggestions.length - 1);
      if (current_suggestion_index > current_suggestions.length - 1) {
        current_suggestion_index = 0;
      }
    }
  }

}

initValidCommands();

$term_input.on('keydown', function (e) {
  //console.log(e.keyCode);
  if (e.keyCode === 9 && !e.shiftKey) {
    //console.log('Press Key Button');
    e.preventDefault();
    tabCompletion()
  }
  if (e.keyCode === 8) {
    current_suggestions = [];
    current_suggestion_index = 0;
    tabCompletionUserInput = "";
  }
});


$term_input.on('keypress', function (e) {
  current_suggestions = [];
  current_suggestion_index = 0;
  tabCompletionUserInput = "";
  if (e.which === 13) {
    handleCommand($term_input.val());
    history_index = 0;
  }
});

$term_input.on('keydown', function (e) {
  if (e.which === 38) {
    //console.log("up key");
    $term_input.val(prevoius_cmds[history_index]);
    if (history_index < prevoius_cmds.length - 1) {
      history_index++;
      console.log(history_index);
    }

  }
  if (e.which === 40) {
    //console.log("down key");
    $term_input.val(prevoius_cmds[history_index]);
    if (history_index > 0) {
      history_index--;
      console.log(history_index);
    }

  }
});