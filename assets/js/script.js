//array to hold objects to be saved in localstorage
var hourlyEvents = []
// hour ids, used to call loop through info to be saved
var hourId = 0
//luxon DateTime set up call
var DateTime = luxon.DateTime
//currentDate call for header element of page
var currentDate = DateTime.now().toFormat('MMMM dd, yyyy')
//currentTimeObj generates and object that can be used to go through the
//different time elements such as year, month, hour, and minutes,
var currentTimeObj = DateTime.now().toObject()

//function that saves events to the localstorage
var saveEvents = function(){
    localStorage.setItem("hourlyEvents", JSON.stringify(hourlyEvents))
}

// function that loads all the data in local stoage
var loadEvents = function() {
    var events = JSON.parse(localStorage.getItem("hourlyEvents"))

    //check to see if storage is empty if loopthrough and append text to
    //corresponding id
    if(!hourlyEvents){
        hourlyEvents = []
    }else{
        $.each(events, function() {
            //set text in each paragraph element 
            $("#"+ events[hourId].hourId).text(events[hourId].text)
    
            //add to the id count
            hourId++
            //if id count reaches 9 reset it
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
    //get current text from p element
    var text = $(this)
        .text()
        .trim()

    //get id of clicked p element
    var id = $(this).attr("id")

    //create textarea
    var textArea = $("<textarea>")
    .attr("id", id)
    .addClass("form-control col-10")
    .val(text)

    //replace current p element with text area
    $(this).replaceWith(textArea)

    //trigger focus on that element
    textArea.trigger("focus")
})


// save what is in the text area when the savebtn is clicked
$(".saveBtn").click(function(){
    var id = $("textarea").attr("id")
    console.log(id)
    //get text from textarea
    var text = $("#"+id).val()
    
    //create p element
    var p = $("<p>")
    .attr("id",id)
    .addClass("col-10 description description-borders")
    .text(text)

    //replace textarea
    $("#"+id).replaceWith(p)

    checktime()
    //call updateEvents function to update events in localStorage
    updateEvents()
})

// function that can be called to check time and set backgrounds
var checktime = function() {
    //calls each div with calls of row and loops through them to check current
    //hour vs what the hour of each time block is
    $(".row").each(function(){
    //get data-hour attribute of row to know which hour it is 
    var hour = $(this).attr("data-hour")
    //parseInt string to intiger
    hour = parseInt(hour)
    
    
    //if and else if functions to check hour vs current time
    //if the if method checks out it calls a part of the div (the <p> tag)
    //then sets the background color

    // 1. if checks to see if the timeblock hour is current the hour
    // 2. else if checks to see if the timeblock hour is in the past
    // 3. else if checks to see if the timeblock hour is in the future
    if(hour === currentTimeObj.hour){
        var childElement = $(this).children(".description")
            
        childElement.addClass("present")
        
    } else if(hour < currentTimeObj.hour){
        var childElement = $(this).children(".description")
    
        childElement.addClass("past")
    } else if(hour > currentTimeObj.hour){
        var childElement = $(this).children(".description")
    
        childElement.addClass("future")
    }
})
}





// function that updates the localstorage with events that have been changed
var updateEvents = function(){
    //clear hourlyEvents array everytime an event is changed so that changes
    //dont over lap when pushed
    hourlyEvents=[]
    //loops through each div with row class 
    $(".row").each(function() {
        
        // set tempary object to be pushed to hourlyEvents that will be save in
        // localStorage
        var tempObj = {
            text: p,
            hourId: hourId,
        }
    
        //gets paragraph tag in div. collets text in div then saves it tempObj
        var p = $("#" + hourId).text().trim()
        tempObj.hourId = hourId
        tempObj.text = p
    
        //add to the id count
        hourId++
        //if id count reaches 9 reset it
        if (hourId >= 9){
            hourId = 0
        }
        
        //push tempObj to hourlyEvents to be saved
        hourlyEvents.push(tempObj)
    
        //save hourlyEvents array
        saveEvents()
    })
}


//call loadEvents function
loadEvents()

//call checktime event ever 15 minutes tp update backgrounds
setInterval(() => {
    checktime()
}, 900000);

//check time when page is first loaded
checktime()
