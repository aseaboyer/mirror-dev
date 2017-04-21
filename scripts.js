var und,
    dayEle, dateEle, hourEle, minuteEle, secondEle, ampmEle, weatherIcon,
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function updateTime () {
    var today = new Date;
    var ampm = today.getHours () >= 12 ? 'pm' : 'am';
    
    dayEle.innerHTML = days [today.getDay ()];
    dateEle.innerHTML = today.getMonth () + "/" + 
        today.getDate () + "/" + today.getFullYear ();
    hourEle.innerHTML = (today.getHours () % 12);
    minuteEle.innerHTML = doubleDigits (today.getMinutes ());
    secondEle.innerHTML = doubleDigits (today.getSeconds ());
    ampmEle.innerHTML = ampm;

    var t = setTimeout(updateTime, 500); // update time
}

function requestWeather () {
    var dataBack,
        updateFreq = (2 * 60 * 60 * 1000), // update in two hours
        apiURL = "api.openweathermap.org/data/2.5/weather" + 
            "?zip=98052,us&appid=eb2878d64c328aa9b2009211c2eb1271",
        apiReq = new XMLHttpRequest();
    
    // ping the api
    apiReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           updateWeather (xhttp.responseText);
        }
    };
    apiReq.open("GET", apiURL, true);
    apiReq.send();
    
    var t = setTimeout(requestWeather, updateFreq); // update every two hours
}
function updateWeather (data) {
    var d = JSON.parse (data);
    console.log (data);
    
    if (dataBack !== und) {
        //weatherIcon.setAttribute ("class", "wi"); // set to just wi
        // Add the specific class
        //weatherIcon.classList.add ();
    }
    
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
    weatherIcon = document.getElementById('current-weather-icon');
    
    updateTime ();
    requestWeather ();
    
    console.log ("Bring in live weather");
    console.log ("Transition alternative positoins with css, alter class with % something");
    console.log ("Probably pump up those font sizes on the time");
}