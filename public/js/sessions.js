let u;
$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    u=data.id
  });

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
          if(response[i].public == 1){
          const a = $(
            "<br><button class= 'btn-outline-primary mb-1 mt-2 btn d-flex justify-content-center btn-default btn-block'>"
          );
          a.addClass("snips");
          a.attr("id", response[i].id);
          a.text(response[i].title);
          $("#searchResults").prepend(a);
        }
        }
        $("#searchResults").on("click", e => {
          console.log(e.target.id)
          e.preventDefault();
          for (let j = 0; j < response.length; j++) {
            console.log(response[j].id)
            if(e.target.id == response[j].id){
            const codeSnip = response[j].snip;
            editor.setValue(codeSnip);
          }
          }
        });
      });
  });

  $(".personalbtn").on("click", event => {
    event.preventDefault();
    console.log("click");
    const searchParams = {
      userId: u,
      codeType: $("#personalfilter").val().trim()
    };
    console.log(searchParams)
    $.get(`/api/user/search/${searchParams.userId}`)
      // on success, run this callback
      .then(response => {
        console.log("thing", response);
        // log the data we found
        $("#personalcontainer").empty();
        for (let i = 0; i < response.length; i++) {
          if(response[i].codeType=== searchParams.codeType){
              const a = $(
            "<br><button class= 'btn-outline-primary mb-1 mt-2 btn d-flex justify-content-center btn-default btn-block'>"
          );
          a.addClass("snips");
          a.attr("id", response[i].id);
          a.text(response[i].title);
          $("#personalcontainer").prepend(a);
          }
        
        }
        $("#personalcontainer").on("click", e => {
          console.log(e.target.id)
          e.preventDefault();
          for (let j = 0; j < response.length; j++) {
            console.log(response[j].id)
            if(e.target.id == response[j].id){
            const codeSnip = response[j].snip;
            editor.setValue(codeSnip);
          }
          }
        });
      });
  });

});
