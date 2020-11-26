const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}))
app.get("/",function(req, res){

  res.sendFile(__dirname + "/index.html")

})
app.post("/", function(req, res){
const query = req.body.cityName;
const apiKey = "408f2de4bb26504ab5f7467cb7544a7e";
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +"";
https.get(url, function(response){
  console.log(response.statusCode);
  response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
res.write("<h1>Weather : " + weatherDescription + "</h1>")
res.write("<img src="+ imgUrl +">")
res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>")

res.send()
  })
})
})


app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
