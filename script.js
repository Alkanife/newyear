var deadline = new Date("Jan 1, 2024 00:00:00").getTime(); 
var x = setInterval(function(){ 
    var now = new Date().getTime(); 
    var t = deadline - now; 

    var background_image = document.getElementById("background_image");
    var time = document.getElementById("time");

    if (t < 1000){ 
        clearInterval(x); 
        background_image.style.backgroundImage = "url('happynewyear.gif')";
        time.innerHTML = "HAPPY NEW YEAR! 🥳";
        time.style = "font-size: 700%;";
        document.title = "Happy new year! 🥳";
        return;
    }

    var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
    var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
    var seconds = Math.floor((t % (1000 * 60)) / 1000); 

    /*console.log("now = " + now);
    console.log("t = " + t);
    console.log("days = " + days);
    console.log("hours = " + hours);
    console.log("minutes = " + minutes);
    console.log("seconds = " + seconds);
    console.log("--------");*/ 

    background_image.style.backgroundImage = "url('https://64.media.tumblr.com/17dd84fa820ae8b57a86cb07b899bc7c/tumblr_owjm721f1j1vu5dwpo1_500.gifv')";

    // -24H
    if (days < 1) {
        // last seconds
        if (days == 0 && hours == 0 && minutes == 0 && seconds != 0) {
            time.style = "font-size: 1200%;";
            time.innerHTML = "⏳ " + seconds + " ⏳";
            return;
        }

        // last day
        var formattedHours = "";
        if (hours > 0) {
            if (hours < 10) formattedHours = "0";
            formattedHours = formattedHours + hours + ":";
        }

        var formattedMinutes = "";
        if (minutes < 10) formattedMinutes = "0";
        formattedMinutes = formattedMinutes + minutes + ":";

        var formattedSeconds = "";
        if (seconds < 10) formattedSeconds = "0";
        formattedSeconds = formattedSeconds + seconds;

        time.style = "font-size: 700%;";
        time.innerHTML = "⏳ " + formattedHours + formattedMinutes + formattedSeconds + " ⏳";
        return;
    }

    var formattedDays = "";
    if (days == 1) {
        formattedDays = "1 day";
    } else {
        formattedDays = days + " days";
    }

    var formattedHours = "";
    if (hours != 0) {
        if (minutes == 0 && seconds == 0) {
            formattedHours = " and ";
        } else {
            formattedHours = ", ";
        }

        if (hours == 1) {
            formattedHours = formattedHours + "1 hour";
        } else {
            formattedHours = formattedHours + hours + " hours";
        }
    }

    var formattedMinutes = "";
    if (minutes != 0) {
        if (seconds == 0) {
            formattedMinutes = " and ";
        } else {
            formattedMinutes = ", ";
        }

        if (minutes == 1) {
            formattedMinutes = formattedMinutes + "1 minute";
        } else {
            formattedMinutes = formattedMinutes + minutes + " minutes";
        }
    }

    var formattedSeconds = "";
    if (seconds != 0) {
        if (seconds == 1) {
            formattedSeconds = " and 1 second";
        } else {
            formattedSeconds = " and " + seconds + " seconds";
        }
    }
    
    time.innerHTML = "⏳ " + formattedDays + formattedHours + formattedMinutes + formattedSeconds + " ⏳";
}, 1000); 