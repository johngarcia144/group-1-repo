$(document).ready(() => {
  

//captures inputs for new code
  $("#savecode").on("click", event => {
    event.preventDefault();
    const publicStr = $("#privateSelect").val();
    console.log("click")
    const Code = {
      snip: editor.getValue(),
      codeType: $("#languageSelect").val(),
      title: $("#title").val().trim(),
      tags: $("#addKeywords").val().trim(),
      public: parseInt(publicStr)
    };
    $.post("/api/new/", Code).then(data => {
      console.log(data);
    });
  })

    //searches database for language and keyword
    $("#searchcode").on("click", event => {
        event.preventDefault();
        const searchParams = {
            codeType: $("#languageSearch").val(),
            keywords: $("#searchtag").val().trim()
        };

        $.get(`/api/codes/search/:keywords`, searchParams)

            // on success, run this callback
            .then(searchParams => {
                // log the data we found
                console.log(searchParams);
            });
    });
});
