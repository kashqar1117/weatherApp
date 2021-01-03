var apiKey = '56aea7b174cb46d06def2c0892d14ff9'
apiKey = 'c47c7993a34be35d985a7350c0baca7c'
var cityInput ='';
var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityInput+ "&cnt="+ '5' + "&APPID=" + apiKey;






function runCall(queryURL){
  console.log(queryURL)  
    $.ajax({ url: queryURL, method: "GET"}).then(function (response) {
        console.log(response);
        // console.log(response.main);
        // console.log(response.name);
        // console.log(response.main.temp);
        // console.log(response.main.humidity);
        // console.log(response.weather[0].icon)
        

            //for loop
            //create div

        $('.card-title').text(response.name)
        $('.temp').text("Temp: " + response.main.temp)
        $('.humidity').text("Humidity: " + response.main.humidity + "%")
        $('#iconHolder').attr('<img src = "http://openweathermap.org/img/wn/10d@2x.png">')
        
    });
    
    
}

$('#button-addon2').on('click', function(){

        
     var cityInput = $('.form-control').val().trim()
     console.log(cityInput)
     queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7&appid=" + apiKey;

    runCall(queryURL)
})



//api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7&appid={API key}

// api.openweathermap.org/data/2.5/weather?q=Chicago&appid=c47c7993a34be35d985a7350c0baca7c
// api.openweathermap.org/data/2.5/forecast/daily?q=Chicago&appid=c47c7993a34be35d985a7350c0baca7c

