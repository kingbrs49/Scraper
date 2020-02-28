var globalArticleId;
$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(".saveArticle").on("click", function () {
    var thisId = $(this).attr("data-id");
    console.log(thisId);

    $.ajax({
        method: "PUT",
        url: "/api/articles/" + thisId,
        data: {
            saved: true
        }
    }).then(function () {
        window.location.reload();
    });
});

$(".deleteArticle").on("click", function () {
    var thisId = $(this).attr("data-id");
    console.log(thisId);

    $.ajax({
        method: "DELETE",
        url: "/api/articles/" + thisId,
    }).then(function () {
        window.location.reload();
    });
});

$(".saveComment").on("click", function () {
    const comment = $(".notes").val();
    const commentObj = {
        body: comment
    }

    $.ajax({
        method: "POST",
        url: "/api/comments/" + globalArticleId,
        data: commentObj
    }).then(function(res){
        console.log(res)
    })
});


$('.comment').on("click", function(){
 const id = $(this).attr("data-id");
 globalArticleId = id;
   const commentSection = $("#comments");
//    console.log(id);

   commentSection.empty();

   $.ajax({
    method: "GET",
    url: "/api/articles/" + id,
}).then(function (res) {
    console.log(res.note.length)


    for(let i =0; i < res.note.length;i++){
        const pTag = $("<p>");
        pTag.text(res.note[i].body);

        commentSection.append(pTag);
    }

    
});

});

// $(".articleComment").on("click", function () {
//     $(".notes").empty();
//     var thisId = $(this).attr("data-id");

//     $.ajax({
//         method: "GET",
//         url: "/articles/" + thisId
//     })
//     .then(function (data) {
//         console.log(data);
//          
//         
//         if (data.note) {
//             $("#titleinput").val(data.note.title);
//             $("#bodyinput").val(data.note.body);
//         }
//     });
// });

// $(".saveComment").on("click", function () {
//     var thisId = $(this).attr("data-id");

//     $.ajax({
//         method: "POST",
//         url: "/articles/" + thisId,
//         data: {
//             title: $("#titleinput").val(),
//             body: $("#bodyinput").val()
//         }
//     })
//     .then(function (data) {
//         console.log(data);
//         $("#notes").empty();
//     });

//     $("#titleinput").val("");
//     $("#bodyinput").val("");
// });