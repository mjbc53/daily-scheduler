//array to hold objects to be saved
var hourlyTasks = []

//var test = $("#description")


//on click convert to a text area
$("#hour-calender").on("click", "#desc",function(){
    var text = $(this)
        .text()
        .trim()

    var textArea = $("<textarea>")
    .attr("id", "textarea-desc")
    .addClass("form-control col-10")
    .val(text)

    $(this).replaceWith(textArea)

   textArea.trigger("focus")
})


$(".saveBtn").click(function(){
    var text = $("#textarea-desc").val()

    var paragraph = $("<p>")
    .attr("id","desc")
    .addClass("col-10 description description-borders")
    .text(text)

    $("#textarea-desc").replaceWith(paragraph)
})
