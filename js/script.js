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

$term_input.on('keypress', function (e) {
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