var dayEle, dateEle, timeEle, hourEle, minuteEle, secondEle, ampmEle,
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function startTime() {
    var today = new Date;
    var ampm = today.getHours () >= 12 ? 'pm' : 'am';
    
    dayEle.innerHTML = days [today.getDay ()];
    dateEle.innerHTML = today.getMonth () + "/" + 
        today.getDate () + "/" + today.getFullYear ();
    hourEle.innerHTML = (today.getHours () % 12);
    minuteEle.innerHTML = doubleDigits (today.getMinutes ());
    secondEle.innerHTML = doubleDigits (today.getSeconds ());
    ampmEle.innerHTML = ampm;
    /*
    timeEle.innerHTML = (today.getHours () % 12) + ":" +
        today.getMinutes () + ":" + today.getSeconds () + 
        ampm;
    */
    /*
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var ampm = "am";
    if (h >= 12) {
        h -= 12;
        ampm = "pm";
    }
    m = checkTime(m);
    s = checkTime(s);
    timeEle = h + ":" + m + ":" + s + " " + ampm;
    */
    var t = setTimeout(startTime, 500);
}
function doubleDigits(i) {
    if (i < 10) {i = "0" + i}; // add zero in front of numbers < 10
    return i;
}

// init
window.onload = function () {
    // Load values
    dayEle = document.getElementById('current-day');
    dateEle = document.getElementById('current-date');
    hourEle = document.getElementById('current-hour');
    minuteEle = document.getElementById('current-minute');
    secondEle = document.getElementById('current-seconds');
    ampmEle = document.getElementById('current-ampm');
    
    startTime ();
}