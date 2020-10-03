let u;
$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    u = data.id;
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
  });

  function showSaveBtn() {
    $("#savecode").show();
  }
  function hideSaveBtn() {
    $("#savecode").hide();
  }

  //captures inputs for new code
  $("#savecode").on("click", event => {
    event.preventDefault();
    const publicStr = $("#privateSelect").val();
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
  $("#copy").on("click", event => {
    const copyTextarea = document.querySelector("#clipboard-content");
    copyTextarea.value = editor.getValue();
    copyTextarea.select();
    document.execCommand("copy");
  });

  //searches database for language and keyword
  $("#searchcode").on("click", event => {
    event.preventDefault();
    showSaveBtn();
    $(".buttonappend").empty();
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
        // console.log("thing", response);
        // log the data we found
        $("#searchResults").empty();
        for (let i = 0; i < response.length; i++) {
          if (
            response[i].public == 1 &&
            response[i].codeType === searchParams.codeType
          ) {
            const a = $(
              "<br><button class= 'btn-outline-primary mb-1 mt-2 btn d-flex justify-content-center btn-default btn-block'>"
            );
            a.addClass("snips globalresultsbtn");
            a.attr("id", response[i].id);
            a.attr("data-userid", response[i].userId);
            a.text(response[i].title);
            $("#searchResults").prepend(a);
          }
        }
        $(".globalresultsbtn").on("click", e => {
          e.preventDefault();
          $(".buttonappend").empty();
          showSaveBtn();
          console.log(e.target.dataset.userid);
          const id = e.target.id;
          const userid = e.target.dataset.userid;
          console.log("line80 dataset", e.target.dataset);
          if (userid == u) {
            updateDeleteBtn(userid, id);
            hideSaveBtn();
          }

          for (let j = 0; j < response.length; j++) {
            // console.log(response[j].id);
            if (id == response[j].id) {
              const codeSnip = response[j].snip;
              editor.setValue(codeSnip);
              $("#languageSelect").val(response[j].codeType);
              $("#addKeywords").val(response[j].keywords);
              $("#title").val(response[j].title);
              const mode = $("#languageSelect").val();
              editor.session.setMode(`ace/mode/${mode}`);
              console.log(response[j].public);
              // console.log(typeof response[j].public);
              if (response[j].public == true) {
                // console.log("TRUE!");
                $("#privateSelect").val("1");
              } else {
                $("#privateSelect").val("0");
              }
            }
          }
        });
      });
  });

  $(".personalbtn").on("click", event => {
    event.preventDefault();
    const searchParams = {
      userId: u,
      codeType: $("#personalfilter")
        .val()
        .trim()
    };
    $.get(`/api/user/search/${searchParams.userId}`)
      // on success, run this callback
      .then(response => {
        // log the data we found
        $("#personalcontainer").empty();
        for (let i = 0; i < response.length; i++) {
          if (response[i].codeType === searchParams.codeType) {
            const a = $(
              "<br><button class= 'btn-outline-primary mb-1 mt-2 btn d-flex justify-content-center btn-default btn-block'>"
            );
            a.addClass("snips resultsbtn");
            a.attr("id", response[i].id);
            a.attr("data-userid", response[i].userId);
            a.text(response[i].title);
            $("#personalcontainer").prepend(a);
          }
        }
        $("#personalcontainer").on("click", e => {
          e.preventDefault();
          let id = e.target.id
          let userid = e.target.dataset.userid;
          $(".buttonappend").empty();
          updateDeleteBtn(userid, id);
          hideSaveBtn();
          for (let j = 0; j < response.length; j++) {
            if (e.target.id == response[j].id) {
              const codeSnip = response[j].snip;
              editor.setValue(codeSnip);
            }
          }
        });
      });
  });
  //make delete/update buttons when userId equals user
  function updateDeleteBtn(userid, id) {
    const deletebtn = $(
      "<button class= 'btn-outline-primary mb-1 mt-2 btn d-flex justify-content-center btn-default '>"
    );
    deletebtn.attr("id", id);
    deletebtn.attr("data-userid", userid);
    deletebtn.addClass("delete");
    deletebtn.text("Delete Code Snip");
    const updatebtn = $(
      "<button class= 'btn-outline-primary mb-1 mt-2 btn d-flex justify-content-center btn-default '>"
    );
    updatebtn.attr("id", id);
    updatebtn.attr("data-userid", userid);
    updatebtn.addClass("update");
    updatebtn.text("Update Code Snip");
    $(".buttonappend").append(deletebtn, updatebtn);

    $(".delete").on("click", e => {
      e.preventDefault();
      console.log("click");
      // let id = e.target.id;
      console.log(id);
      $.ajax({
        method: "DELETE",
        url: `/api/codes/delete/${id}`
      });
      var personaldiv = $("#personalcontainer")
      var searchdiv = $("#searchResults")
      personaldiv.find("button").attr("id",e.target.id).remove()
      searchdiv.find("button").attr("id",e.target.id).remove()
      personaldiv.find("brk").remove()
      searchdiv.find("brk").remove()
    });
    $(".update").on("click", e => {
      e.preventDefault();
      let publicStr = $("#privateSelect").val();
      let updatedCode = {
        id: e.target.id,
        userId: u,
        snip: editor.getValue(),
        codeType: $("#languageSelect").val(),
        title: $("#title").val().trim(),
        keywords: $("#addKeywords").val().trim(),
        public: parseInt(publicStr)
      };
      //function (updatedCode) {
      $.ajax({ method: "PUT", url: `/api/codes/update/${id}`, data: updatedCode });
     // };
    });
  }
});
