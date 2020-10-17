// Configure moment holidays
moment.modifyHolidays.set(['Memorial Day', 'Independence Day', 'Labor Day']);

// Add Pioneer Day
moment.modifyHolidays.add({
    "Pioneer Day": {
        date: '7/24',
        keywords_y: ['pioneer']
    }
  });
  


var caniride = {
    "citycreek": function () {
        // Data structure to return
        var returnData = {
            "result" : "Yes",
            "explanation" : "I don't see any reason why you can't."
        };

        // special logic to get the 3rd week of the month in October for City Creek
        function weekOfMonth (input = moment()) {
            const firstDayOfMonth = input.clone().startOf('month');
            const firstDayOfWeek = firstDayOfMonth.clone().startOf('week');
        
            const offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');
        
            return Math.ceil((input.date() + offset) / 7);
        }

        var today = moment();

        // Check to see if its one of the holidays City Creek doesn't allow
        if (today.isHoliday()) {
            returnData.result = "No";
            returnData.explanation = "Today is a Utah holiday.";
        }
        
        var lastMondayOfMay = moment().month("May").endOf("month").startOf("isoweek");
        var lastEvenDayOfSept = moment().month("September").endOf("month");

        // If the last day of September is odd, subtract a day
        if (lastEvenDayOfSept.date() % 2 != 0) lastEvenDayOfSept = lastEvenDayOfSept.add(-1, "day");
        
        // If we're on special schedule for City Creek, check even/odd
        if (today.isAfter(lastMondayOfMay) && today.isBefore(lastEvenDayOfSept) ) {

            if (today.date() % 2 != 0) {
                returnData.result = "Yes";
                returnData.explanation = "Today is an odd day on the <a href='https://www.slc.gov/utilities/city-creek-canyon/' target='_blank'>City Creek schedule</a>.";
                return returnData;
            }
            else {
                returnData.result = "No";
                returnData.explanation = "It's an even day on the <a href='https://www.slc.gov/utilities/city-creek-canyon/' target='_blank'>City Creek schedule</a>."
            }

        }

        // If it's October and the rifle hunt
        //if ( today.month() == 10 && weekOfMonth(today) == 3) {
        if ( today.month() == 9 && today.date() >= 17 && today.date() < 26) {
            returnData.result = "Probably not";
            returnData.explanation = "City Creek is closed to bicycles during the rifle deer hunt. Dates vary from year to year for this hunt but it is typically the third week in October."
        }

        return returnData;
    },
    "millcreek" : function () {
        var today = moment();
        var returnData = {
            "result" : "Yes",
            "explanation" : "I don't see any reason why you can't."
        };

        if (today.date() % 2 != 0) {
            returnData.result = "No";
            returnData.explanation = "Today is an odd day on the <a href='https://slco.org/parks/millcreek-canyon/' target='_blank'>Millcreek Canyon schedule</a>. Bikes are <strong>NOT</strong> allowed on Big Water, Little Water, and Great Western Trails.";
        }
        else {
            returnData.result = "Yes";
            returnData.explanation = "It's an even day on the <a href='https://slco.org/parks/millcreek-canyon/' target='_blank'>Millcreek Canyon schedule</a>. Bikes are allowed on Big Water, Little Water, and Great Western Trails."
        }

        return returnData;
    },
    "emigration": function() {
        // Data structure to return
        var returnData = {
            "result" : "Yes",
            "explanation" : ""
        };

        returnData.result = "Yes";
        returnData.explanation = "Yes, <a href='https://twitter.com/ozskier/status/1306433630453915648' target='_blank'>Dave</a>. You can ride Emigration Canyon today.";
        return returnData;
    },
    "guardsman" : function () {
        // Data structure to return
        var returnData = {
            "result" : "Yes",
            "explanation" : ""
        };

        returnData.result = "Yes";
        returnData.explanation = "Guardsman Pass is clear and open to cars and bicycles.";
        return returnData;

    }
};
// Execute
document.addEventListener("DOMContentLoaded", function(){
    if (caniride[rideLocation] != "undefined") {
        var data = caniride[rideLocation]();
        document.getElementById("answer").innerText = data["result"];
        document.getElementById("explanation").innerHTML = data["explanation"];    
    }
    else {
        document.getElementById("answer").innerText = "Maybe";
        document.getElementById("explanation").innerHTML = "We don't have data for that location."; 
    }
});