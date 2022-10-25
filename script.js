const apiKey ="09e69468cec283b2ea6e918cf696bdf8";

//variable for base url
const baseURL= "https://api.openweathermap.org/data/2.5/weather";

//function that does weather search 
function weatherSearch(city){
    console.log(city)
    //constructing url for request
    // const url = `${baseURL}?t=${city}&apikey=${apiKey}`
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`



    //make your request to first API
    $.ajax(url)
    .then((coord) => {
        console.log(coord[0].lat);
        console.log(coord[0].lon);

        const lat = coord[0].lat;
        const lon = coord[0].lon;

       

        //Second API call
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        console.log(weatherURL)

        $.ajax(weatherURL)
        .then((weather) => {
            console.log(weather)



            // rendering data to screen
            const $divCity = $("#city")
            $divCity.text("Weather for: " + weather.name)
            // $divCity.empty();

            const $divTemp = $("#temp")
            $divTemp.text("Temperature: " + (weather.main.temp - 273.15) *9/5 + 32)
            // $divTemp.empty();

            const $divIndex = $("#index")
            $divIndex.text("Feels Like: " + (weather.main.feels_like) *9/5 +32)
            // $divIndex.empty();

            const $divDesc = $("#desc")
            $divDesc.text("Weather: " + weather.weather[0].description)
            // $divDesc.empty();
            
            console.log(weather)

           
        })

    })
}

// grab the submit button, put a click event on it
$("input[type=submit]").on("click", (event) => {
    //prevent for refresh
    event.preventDefault()

    //grab text from input box
    const inputText =$("input[type=text]").val()

    //update the screen
    weatherSearch(inputText)
})

weatherSearch("Denver")

console.log(apiKey, baseURL)