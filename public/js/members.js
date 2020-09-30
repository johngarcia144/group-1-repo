$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.username);
  });
<<<<<<< HEAD


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

  //captures inputs for new code
  $("#savecode").on("click", event => {
    event.preventDefault();
    const Code = {
      snip: editor.getValue(),
      codeType: $("#languageSelect").val(),
      title: $("#title").val().trim(),
      tags: $("#addKeywords").val().trim(),
      public: $("#privateSelect").val().trim()
    };

    //add post api here
    $.get("/api/codes/", () => {}).then(dbCodes => {
      console.log(dbCodes);
    });
  });

  //searches database for language and keyword
  $("#searchcode").on("click", event => {
    event.preventDefault();
    const searchParams = {
      codeType: $("#languageSearch").val(),
      keywords: $("#searchtag").val().trim()
    };
    console.log(searchParams);
    //add get api here
  });
=======
>>>>>>> de05ae288d4463f3426d77cf5cbeefcb30063d7c
});
