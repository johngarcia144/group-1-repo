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
    const searchParams = {
      codeType: $("#languageSearch").val(),
      keywords: $("#searchtag")
        .val()
        .trim()
    };

    $.get(`/api/codes/search/${searchParams.keywords}`)
      // on success, run this callback
      .then(searchParams => {
        // log the data we found
        location.reload();
      });
  });
});
