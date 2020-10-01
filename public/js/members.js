$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.username);
  });

  let editor = ace.edit("editor");
  editor.setTheme("ace/theme/tomorrow_night");
  editor.session.setMode("ace/mode/xml");
  editor.session.setUseSoftTabs(true);

  //toggles mode
  $("#languageSelect").on("change", event =>{
    event.preventDefault();
    let mode = $("#languageSelect").val()
    editor.session.setMode(`ace/mode/${mode}`);
    console.log("toggle");
  });
});
