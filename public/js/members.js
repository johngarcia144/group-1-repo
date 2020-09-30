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

  $("#languageSelect").on("change", event =>{
    event.preventDefault();
    let mode = $("#languageSelect").val()
    editor.session.setMode(`ace/mode/${mode}`);
    console.log("toggle");
  });

  $("#savecode").on("click", event => {
    event.preventDefault();
    const Code = {
      // Save the book they typed into the book-search input
      snip: editor.getValue(),
      codeType: $("#languageSelect").val(),
      title: $("#title").val().trim(),
      tags: $("#tags").val().trim()
    };
    console.log(Code);
  });
});
