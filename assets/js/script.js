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

var loadEvents = function() {
    var events = JSON.parse(localStorage.getItem("hourlyEvents"))
    console.log(events)
    
    if(!hourlyEvents){
        hourlyEvents = []
    }else{
        $.each(events, function() {
            var text = $("#"+ events[hourId].hourId).text(events[hourId].text)
    
            hourId++
            if(hourId >= 9){
                hourId = 0
            }
        })
    }
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
    updateEvents()
})

// $("#hour-calender").on("blur", "textarea", function(){
//     var id = $(this).attr("id")
//     console.log(id)
//     var pTag = $("<p>")
//     .attr("id",id)
//     .addClass("col-10 description description-borders")
//     $(this).replaceWith(pTag)
// })


var updateEvents = function(){
    $(".row").each(function() {
   
        var tempObj = {
            text: p,
            hourId: hourId,
        }
    
        var p = $("#" + hourId).text().trim()
        tempObj.hourId = hourId
        tempObj.text = p
        console.log(tempObj)
    
        hourId++
        if (hourId >= 9){
            hourId = 0
        }
        hourlyEvents.push(tempObj)
    
        saveEvents()
    })
}

//call loadEvents
loadEvents()