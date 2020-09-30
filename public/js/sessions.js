$(document).ready(() => {

    //sets code editor in place 
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow_night");
    editor.session.setMode("ace/mode/xml");
    editor.session.setUseSoftTabs(true);

    //toggles code editor mode
    $("#languageSelect").on("change", event => {
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
            keywords: $("#addKeywords").val().trim(),
            public: $("#privateSelect").val().trim()
        };
        console.log(Code);
        //add post api here
    });

    //searches database for language and keyword
    $("#searchcode").on("click", event => {
        event.preventDefault();
        const searchParams = {
            codeType: $("#languageSearch").val(),
            keywords: $("#searchtag").val().trim()
        };
        $.get("/api/codes/:keywords", searchParams)
            // on success, run this callback
            .then(searchParams => {
                // log the data we found
                console.log(searchParams);
            });
    });
});