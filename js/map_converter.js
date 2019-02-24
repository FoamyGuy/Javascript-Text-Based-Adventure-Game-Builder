
//var csv is the CSV file with headers
function tsvJSON(csv) {
  var lines = csv.split("\n");
  var result = [];

  for (var i = 0; i < lines.length; i++) {
    var currentline = lines[i].split("\t");

    if (i === 0) {
      result.push(Array(currentline.length + 2).join(".").split("."));
    }

    console.log(currentline.length);
    if (currentline.length > 1) {
      currentline.unshift("");
      currentline.push("");

      console.log(currentline);
      result.push(currentline);
    }

  }
  result.push(Array(result[0].length).join(".").split("."));
  //return result; //JavaScript object

  return JSON.stringify(result).split("],[").join("],\n["); //JSON
}


$("#convert-btn").click(function () {
  $("#json-output").val("var MAP = " + tsvJSON($("#csv-input").val()) + ";");
  $("#json-output").select();
});

$("textarea").val("");