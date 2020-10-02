$(document).ready(() => {
  const editor = ace.edit("editor");
  editor.setTheme("ace/theme/tomorrow_night");
  editor.session.setMode("ace/mode/xml");
  editor.session.setUseSoftTabs(true);
  //toggles mode
  $("#languageSelect").on("change", event => {
    event.preventDefault();
    const mode = $("#languageSelect").val();
    editor.session.setMode(`ace/mode/${mode}`);
    console.log("toggle");
  });

  //captures inputs for new code
  $("#savecode").on("click", event => {
    event.preventDefault();
    const publicStr = $("#privateSelect").val();
    console.log("click");
    $.get("/api/user_data").then(data => {
      const Code = {
        userId: data.id,
        snip: editor.getValue(),
        codeType: $("#languageSelect").val(),
        title: $("#title")
          .val()
          .trim(),
        keywords: $("#addKeywords")
          .val()
          .trim(),
        public: parseInt(publicStr)
      };
      submitcode(Code);
    });
  });
  function submitcode(newcode) {
    $.post("/api/codes/new/", newcode).then(data => {
      console.log(data);
    });
  }

  //searches database for language and keyword
  $("#searchcode").on("click", event => {
    event.preventDefault();
    console.log("click");
    const searchParams = {
      codeType: $("#languageSearch").val(),
      keywords: $("#searchtag")
        .val()
        .trim()
    };

    $.get(`/api/codes/search/${searchParams.keywords}`)
      // on success, run this callback
      .then(response => {
        console.log("thing", response);
        // log the data we found
        $("#searchResults").empty();
        for (let i = 0; i < response.length; i++) {
          const a = $(
            "<button class= 'btn-outline-primary mb-1 mt-2 btn d-flex justify-content-center btn-default btn-block'>"
          );
          a.addClass("snips");
          a.attr("id", response[i].id);
          a.text(response[i].title);
          $("#searchResults").prepend(a);
        }
      });
  });
});
