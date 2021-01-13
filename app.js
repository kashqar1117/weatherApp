
var relativeTime = moment().add(1, 'days').calendar()
var searchHistory =[]


//current weather data
function runCall(queryURL){

    console.log(queryURL)  
    $.ajax({ url: queryURL, method: "GET"}).then(function (response) {
        (response.main);
//Icon varaibles
      var icon = response.weather[0].icon
      var iconUrl =  "http://openweathermap.org/img/w/" + icon + ".png"
     
//First Card Information
        $('.card-title').text(response.name)
        $('.date').text(moment().format("MMM Do YY"))
        $('#wicon').attr('src', iconUrl);
        $('.temp').text("Temp: " + response.main.temp)
        $('.humidity').text("Humidity: " + response.main.humidity + "%")
        $('#iconHolder').attr('<img src = "http://openweathermap.org/img/wn/10d@2x.png">')
        $('.windSpeed').text('Wind Speed: ' +response.wind.speed+ ' miles')
        fiveDayForcast(response)     
    });
      
}
    //Five day forcast information
function fiveDayForcast(response){
    var long = response.coord.lon;
    var lat = response.coord.lat;
    var queryTwoUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly&appid=c47c7993a34be35d985a7350c0baca7c`;
   
   //second Call
    $.ajax({ url: queryTwoUrl, method: "GET"})
    .then(function (forcastData) {
        
        console.log(forcastData)

        for (var i =0; i<5;i++){
    //create
            var newDiv = $('<div>')


     //addclass
            newDiv.addClass('border')


    //append to forcastDiv
            $('.fiveDayForcast').append(newDiv)
            
            
           
     //innerHtml
    
            newDiv.html(
            `<h5>${forcastData.timezone}</h5>
            <h6>${moment().add(1 +i, 'days').calendar()}</h6>
            <img src = "http://openweathermap.org/img/w/${forcastData.daily[i].weather[0].icon}.png">    
            <p> Temp: ${forcastData.daily[i].temp.day}</p>
            <p> Humidity: ${forcastData.daily[i].humidity} %</p>
            <p> Wind Speed: ${forcastData.daily[i].wind_speed} miles</p>
            <p> UV: ${forcastData.daily[i].uvi}</p>`
            )         
           
        }

        
   
         
     });
    
     
    }
    
    $('#button-addon2').on('click', function(){
        $('.card-title').empty()
        $('.date').empty()
        $('.icon').empty()
        $('.temp').empty()
        $('.humidity').empty()
        $('.windSpeed').empty()
        $('.card2').empty()
        
        var cityInput = $('.form-control').val().trim()
        searchHistory.push(cityInput)
        localStorage.setItem('searchHistory' , searchHistory)
        
        
        queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=c47c7993a34be35d985a7350c0baca7c`
        
        runCall(queryURL)

        $('.fiveDayForcast').removeClass('hide')
        $('.card').removeClass('hide')
    })
    
    
    
    
    