$(document).ready(() => {
  //Get references to our frontend
  const saveCodeBtn = $("#saveCode");
  const codeSnip = $("#editor");
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  saveCodeBtn.on("submit", event => {
    event.preventDefault();

    const userCode = {
      snip: codeSnip.val()
    };

    saveCode(userCode.snip);
    codeSnip.val("");
  });

  function saveCode(snip) {
    $.post("/api/codes/:snip", {
      snip: snip
    });
  }
});
