//array to hold objects to be saved
var hourlyEvents = []

// hour ids, used to call info to be saved
var hourId = 0
//current date
var DateTime = luxon.DateTime
var currentDate = DateTime.now().toFormat('MMMM dd, yyyy')

var test = $(".container").attr("id")

var textId = ""

var saveEvents = function(){
    localStorage.setItem("hourlyEvents", JSON.stringify(hourlyEvents))
}

//append currentDate to <p> tag in header
$("#currentDay").text(currentDate)


//on click convert to a text area
$("#hour-calender").on("click", ".description",function(){
    var text = $(this)
        .text()
        .trim()

    textId = $(this).attr("id")
    console.log(textId)

    var textArea = $("<textarea>")
    .attr("id", textId)
    .addClass("form-control col-10")
    .val(text)

    $(this).replaceWith(textArea)

   textArea.trigger("focus")
})


$(".saveBtn").click(function(){
    var text = $("#"+textId).val()
    
    var paragraph = $("<p>")
    .attr("id",textId)
    .addClass("col-10 description description-borders")
    .text(text)

    $("#"+textId).replaceWith(paragraph)
})

var func = function(){
$(".row").each(function() {
   
    var tempObj = {
        text: p,
        hourId: hourId,
    }

    var p = $("#" + hourId).text().trim()
    console.log(p)
    tempObj.hourId = hourId
    tempObj.text = p
    console.log(tempObj)

    hourId++
    if (hourId >= 9){
        hourId = 0
    }
    hourlyEvents.push(tempObj)
    saveEvents()
    
});
}
