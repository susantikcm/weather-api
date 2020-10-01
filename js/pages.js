
let rootDiv = document.querySelector('#root');
rootDiv.classList.add('container', 'justify-content-center', 'align-items-center');

const icons = {
    '01d': 'Status-weather-clear-icon.png',
    '02d': 'Status-weather-clouds-icon.png',
    '03d': 'Status-weather-many-clouds-icon.png',
    '04d': 'Status-weather-many-clouds-icon.png',
    '09d': 'Status-weather-showers-scattered-day-icon.png',
    '10d': 'Status-weather-showers-day-icon.png',
    '11d': 'Status-weather-storm-day-icon.png',
    '13d': 'Status-weather-snow-scattered-day-icon.png',
    '50d': '💨',
    '01n': 'Status-weather-clear-night-icon.png',
    '02n': 'Status-weather-few-clouds-night-icon.png',
    '03n': 'Status-weather-clouds-night-icon.png',
    '04n': 'Status-weather-clouds-night-icon.png',
    '09n': 'Status-weather-snow-scattered-night-icon.png',
    '10n': 'Status-weather-showers-night-icon.png',
    '11n': 'Status-weather-storm-night-icon.png',
    '13n': 'Status-weather-snow-scattered-night-icon.png',
    '50n': '💨',
};

rootDiv.innerHTML = `
    <div class="card">
        <div class="card-header bg-transparent">
            <form id="search-form" class="form-group">
                <input id="search-input" class="form-control bg-transparent" type="search" placeholder="Search City..." aria-label="Search"> 
            </form> 
        </div>

        <div id="display-weather" class="card-body border-0">
        </div>
    </div>
`;

// <div class="input-group"> 
// <input id="search-input" class="form-control bg-transparent" type="search" placeholder="Search City..." aria-label="Search"> 
// <div class="input-group-prepend border">
//     <button class="btn btn-outline-light rounded-right" type="submit"><span class="fa fa-search"></span></button>
// </div>
// </div>


  