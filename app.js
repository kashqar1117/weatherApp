
var relativeTime = moment().add(1, 'days').calendar()

//current weather data
function runCall(cityInput){
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=c47c7993a34be35d985a7350c0baca7c`
    
    
    $.ajax({ url: queryURL, method: "GET"}).then(function (response) {
        (response.main);
        //Icon varaibles
        var icon = response.weather[0].icon
        var iconUrl =  "http://openweathermap.org/img/w/" + icon + ".png"
        //  console.log("forcast rewsponse" , response)
        //First Card Information
        $('.card-title').text(response.name)
        $('.date').text(moment().format("MMM Do YY"))
        $('#wicon').attr('src', iconUrl);
        $('.temp').text("Temp: " + response.main.temp)
        $('.humidity').text("Humidity: " + response.main.humidity + "%")
        $('#iconHolder').attr('<img src = "http://openweathermap.org/img/wn/10d@2x.png">')
        $('.windSpeed').text('Wind Speed: ' +response.wind.speed+ ' miles')
        fiveDayForcast(cityInput)     
    });
    
}
//Five day forcast information
function fiveDayForcast(cityInput){
    console.log('searching')
    
    
    var queryTwoUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=c47c7993a34be35d985a7350c0baca7c`
   
   //second Call
    $.ajax({ url: queryTwoUrl, method: "GET"})
    .then(function (forcastData) {
        
        console.log(forcastData.list)

        var list = forcastData.list;

        for (var i =0; i<list.length; i++){


            const datapoint = list[i]
             //create
             if(i%7 !==0 ||  i==0) {
                 continue;
             }else{

                 var newDiv = $('<div>')
                 
                 
                 //addclass
                 
                 
                 
                 //append to forcastDiv
                 
                 
                 
                 //innerHtml
                 
                 newDiv.html(
                     `
                     <div  class = "forcastFive p-3 m-2 border"
                     <h5>${datapoint.dt_txt}</h5>
                     <h6>${moment(datapoint.dt_txt).calendar()}</h6>
                     <img src = "http://openweathermap.org/img/w/${datapoint.weather[0].icon}.png">    
                     <p> Temp: ${datapoint.main.temp}</p>
                     <p> Humidity: ${datapoint.main.humidity} %</p>
                     <p> Wind Speed: ${datapoint.wind.speed} miles</p>
                     
                     </div>`
                     
                     )         
                     
                     $('.fiveDayForcast').append(newDiv)
                    }
                }

        
   
         
     });
    
     
    }

    //  // <p> UV: ${forcastData.daily[i].uvi}</p>

// updating history - updating local storage
    function updateHistory(cityInput){
        var searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

            //update

        searchHistory.push(cityInput)
        localStorage.setItem('weatherHistory', JSON.stringify(searchHistory))
    }

//rendering past city inputs into the dom
    function renderHistory(){
        var searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

        console.log(searchHistory.slice(11))
        var weatherHistoryElement = $('#weatherHistory')


        weatherHistoryElement.empty()
        for(var i =0 ; i<searchHistory.length; i++){
           var newBtn =  $('<li>').text(searchHistory[i])
           weatherHistoryElement.prepend(newBtn)
        }

    }

    renderHistory();
    
    $('#button-addon2').on('click', function(){
        event.preventDefault()
        
        $('.card-title').empty()
        $('.date').empty()
        $('.icon').empty()
        $('.temp').empty()
        $('.humidity').empty()
        $('.windSpeed').empty()
        $('.card2').empty()
        
        var cityInput = $('.form-control').val().trim()
      
          
        
        runCall(cityInput)
        updateHistory(cityInput)
        renderHistory();

        $('.fiveDayForcast').removeClass('hide')
        $('.card').removeClass('hide')
    })
    
    
    
    
    