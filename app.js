
//current weather data
function runCall(queryURL){
  console.log(queryURL)  
    $.ajax({ url: queryURL, method: "GET"}).then(function (response) {
       (response.main);

    //    console.log(response.wind.speed)


      var icon = response.weather[0].icon
      var iconUrl =  "http://openweathermap.org/img/w/" + icon + ".png"
       

        $('.card-title').text(response.name)
        $('#wicon').attr('src', iconUrl);
        $('.temp').text("Temp: " + response.main.temp)
        $('.humidity').text("Humidity: " + response.main.humidity + "%")
        $('#iconHolder').attr('<img src = "http://openweathermap.org/img/wn/10d@2x.png">')
        $('.windSpeed').text('Wind Speed: ' +response.wind.speed+ ' miles')
        fiveDayForcast(response)
        
    });
      
}

function fiveDayForcast(response){
    var long = response.coord.lon;
    var lat = response.coord.lat;

    var queryTwoUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly&appid=c47c7993a34be35d985a7350c0baca7c`
   
   //second Call
    $.ajax({ url: queryTwoUrl, method: "GET"})
    .then(function (forcastData) {
        console.log(forcastData);
        console.log(forcastData.daily[0].temp.day);
        console.log(forcastData.daily[0].humidity);
        console.log(forcastData.daily[0].wind_speed);
        var tempPara = forcastData.daily[0].temp.day;
        // var humidpara = forcastData.daily[i].humidity;
        // var windPara = forcastData.daily[i].wind_speed;

        for (var i =0; i<5;i++){
            //create\
            var newDiv = $('<div>')
            $('.fiveDayForcast').append(newDiv)
            //innerHtml
            newDiv.html('<p>'+tempPara+'</p>')
            // newDiv.append(forcastData.daily[0].temp.day)
            // newDiv.html('<p>'+humidpara+'</p>')
            // newDiv.html('<p>'+windPara+'</p>')
            // //append
            // $('.fiveDayForcast').append(tempPara)
        }

        
   
         
     });
    
    

}

$('#button-addon2').on('click', function(){

        
     var cityInput = $('.form-control').val().trim()
     console.log(cityInput)
     queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=c47c7993a34be35d985a7350c0baca7c`

    runCall(queryURL)
})



