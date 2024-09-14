function searchCity() {
    var cityName = cityCaseClean($("cityName")[0].value.trim());
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=8b3a9d9fec91e3b17c463ea6e68f3d3d";

    fetch(requestURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                $("#city-name")[0].textContent = cityName + " (" + dayjs().format('M/D/YYYY') + ")";

                $("#city-list").append('<button type="button" class="list-group-item list-group-item-light list-group-item-action city-name">' + cityName);

                const lat = data.coord.lat;
                const lon = data.coord.lon;

                var latLon = lat.toString() + " " + lon.toString();

                localStorage.setItem(cityName, latLon);

                requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,&units=imperial&appid=8b3a9d9fec91e3b17c463ea6e68f3d3d";

                fetch(requestURL).then(function (newResponse) {
                    if (newResponse.ok) {
                        newResponse.json().then(function (newData) {
                            getCurrentWeather(newData);
                })
            }
        })
    })
}   else {
        alert("Error: cannot find city!");
}
    })
}

$("#search-button").on("click", function (e) {
    e.preventDefault();

    searchCity();

    $("form")[0].reset();
})

function cityCaseClean(city) {
    var cleanedCity = city.toLowerCase().split(" ");
    var cleanedCityName = "";
    for (var i=0; i < cleanedCity.length; i++) {
        cleanedCity[i] = cleanedCity[i][0].toUpperCase() + cleanedCity[i].slice(1);
        cleanedCityName += " " + cleanedCity[i];
    }
    return cleanedCityName;
}

// function searchCity

// $("#search-button").on("click", ".city-name", function () {
//     var coordinates = (localStorage.getItem($(this)[0].textContent)).split(" ");
//     coordinates[0] = parseFloat(coordinates[0]);
//     coordinates[1] = parseFloat(coordinates[1]);

//     $("#city-name")[0].textContent = $(this)[0].textContent + " (" + dayjs().format('M/D/YYYY') + ")";

//     getListCity(coordinates);
// })
