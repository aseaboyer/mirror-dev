var und,
    dayEle, dateEle, hourEle, minuteEle, secondEle, ampmEle, 
    weatherIcon, weatherText, tempEle, 
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
        apiURL = "http://api.openweathermap.org/data/2.5/weather&units=metric" + 
            "?zip=98052,us&appid=eb2878d64c328aa9b2009211c2eb1271",
        apiReq = new XMLHttpRequest();
    
    // ping the api
    apiReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           updateWeather (apiReq.responseText);
        }
    };
    apiReq.open("GET", apiURL, true);
    apiReq.send();
    
    var t = setTimeout(requestWeather, updateFreq); // update every two hours
}
function updateWeather (data) {
    var d = JSON.parse (data),
        textVal, weatherID;
    textVal = d.weather [0].description;
    weatherID = d.weather [0].id;
    console.log (d);
    
    
    if (weatherID !== und) {
        weatherIcon.setAttribute ("class", "wi"); // clear old
        // Add a specific class
        if (weatherID >= 200 && weatherID <= 232) {
            weatherIcon.classList.add ("wi-thunderstorm"); // thunder
        } else if (weatherID >= 300 && weatherID <= 321) {
            weatherIcon.classList.add ("wi-raindrops"); // drizzle
        } else if (weatherID >= 500 && weatherID <= 531) {
            weatherIcon.classList.add ("wi-rain"); // rain
        } else if (weatherID >= 600 && weatherID <= 622) {
            weatherIcon.classList.add ("wi-snow"); // snow
        } else if (weatherID >= 700 && weatherID <= 781) {
            weatherIcon.classList.add ("wi-fog"); // mist/fog
        } else if (weatherID == 800) {
            weatherIcon.classList.add ("wi-day-sunny"); // clear
        } else if (weatherID >= 801 && weatherID <= 804) {
            weatherIcon.classList.add ("wi-cloud"); // clouds
        } else if (weatherID >= 900 && weatherID <= 906) {
            weatherIcon.classList.add ("wi-storm-showers"); // serious weather
        } else if (weatherID >= 951 && weatherID <= 955) {
            weatherIcon.classList.add ("wi-windy"); // breeze
        } else if (weatherID >= 956 && weatherID <= 957) {
            weatherIcon.classList.add ("wi-strong-wind"); // strong wind
        } else if (weatherID >= 958 && weatherID <= 962) {
            weatherIcon.classList.add ("wi-storm-showers"); // strong storm
        }
        
        // set the text
        weatherText.innerHTML = textVal;
        
        // set the temp
        tempEle.innerHTML = d.main.temp + "&#176;";
    }
    
}

function kelvinToC (k) {
    return k - 273.15;
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
    weatherText = document.getElementById('current-weather-text');
    tempEle = document.getElementById('current-temp');
    
    updateTime ();
    requestWeather ();
    
    console.log ("Bring in live weather");
    console.log ("Transition alternative positoins with css, alter class with % something");
    console.log ("Probably pump up those font sizes on the time");
}