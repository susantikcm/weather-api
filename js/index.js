// create a html for the weather card
const createCardHtml = (currentWeather) => {
    const icon = icons[currentWeather.weather[0].icon];
    const rainHtml = () => {
        if(currentWeather.rain) {
            const rainVolume = currentWeather.rain['3h']; 
            return `<div>💧 ${rainVolume} mm</div>`;
        }
        else return '';
    }

    document.querySelector('#display-weather').innerHTML = `
        <div>
            <div>
                <h4 id="city-name" class="text-center"></h4>
                <div class="row d-flex justify-content-between">
                    <div class="col">
                        <h5 class="mb-0">Now</h5>
                        <div>${currentWeather.dt_txt}</div>
                        <h4 class="mt-2 mb-0"><i class="fa fa-thermometer-quarter" aria-hidden="true"></i> ${currentWeather.main.temp}&degC</h4>
                        <div class="mb-2">Feels like ${currentWeather.main.feels_like}&deg c</div>
                        ${rainHtml()}
                        <div>💨 ${currentWeather.wind.speed} m/s</div>
                    </div>
                    <div class="col text-right">
                        <h5 class="mb-0">Today</h5>
                        <div>${currentWeather.weather[0].description}</div>
                        <img src="./img/weather-icons/${icon}" width="80px" />
                        <div class="d-flex justify-content-end text-center">
                            <div>min.</div>
                            <div class="ml-5">max.</div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <h5>${Math.round(currentWeather.main.temp_min)}&deg</h5>
                            <h5 class="ml-5">${Math.round(currentWeather.main.temp_max)}&deg</h5>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div>
                <ul id="next-days">
                    <li>tomorrow</li>
                    <li>tomorrow2</li>
                    <li>tomorrow3</li>
                </ul>
            </div>-->
        </div>
     `;
    document.querySelector('#search-input').focus();
}


// load data to the weather card
const loadWeatherData = weatherData => {
        // console.log(weatherData)
        // change timezone to local date
        const today = new Date();
        const localOffset = weatherData.city.timezone + today.getTimezoneOffset() * 60;
        const localDate = new Date(today.setUTCSeconds(localOffset));
        
        // loop through list of weather data and get the item with the forecast time that is closest to the current local time 
        const currentWeather = weatherData.list.filter(item => {
            const dt = item.dt_txt;
            
            let isTodayData = parseInt(dt.substring(8, 10)) === localDate.getDate();
        
            if(isTodayData) {
                const isCurrentData = (parseInt(dt.substring(11, 13)) - localDate.getHours());
                if(isCurrentData >=0 && isCurrentData <= 2) 
                    return item;
            }
        });
        if(currentWeather[0])
            createCardHtml(currentWeather[0]);
};


// weather api and functions
const apiWeather = '';

const getForeCastByCity = async city => await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiWeather}`)
    .then(response => {
        if(response.status === 200) 
            return response.json();
        else if(response.status === 404)
            alert("City is not found");
        else
            alert(response.statusText);
    });
        
const getForeCastByCoordinate = (lat, long) => fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${apiWeather}`)
    .then(response => {
        if(response.status === 200)
            return response.json();
        else if(response.status === 404)
            alert("City is not found");
        else
            alert(response.statusText);
    })
    .then(data => { 
        loadWeatherData(data);
        document.querySelector('#city-name').innerText = data.city.name + ', ' + data.city.country;
    });


// navigate to current location and get the coordinate
const geoLocation = navigator.geolocation;

const showCoordinate = position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    
    getForeCastByCoordinate(lat, long);
}

const showCoordinateError = (error) => {
    console.warn(`ERROR(${error.code}): ${error.message}`);
}

(() => {
    if (geoLocation)
        geoLocation.getCurrentPosition(showCoordinate, showCoordinateError);
})();



(() => {
    let placesAutocomplete = places({
        appId: '',
        apiKey: '',
        container: document.querySelector('#search-input')
    });
  
    placesAutocomplete.on('change', function(e) {
        // console.log(e.suggestion.value)
        getForeCastByCity(e.suggestion.value)
            .then(data => {
                loadWeatherData(data);
                document.querySelector('#city-name').innerText = e.suggestion.value;
            });
    });
})();