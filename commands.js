"use strict";
var rec = new Recognition();
var speech = speech('pl-PL');

rec.addCommand(/pogoda/i, function() {
  var xhReq = new XMLHttpRequest(),
  url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.bylocation%20WHERE%20location%3D'Warsaw'%20AND%20unit%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  xhReq.open("GET", url);
  xhReq.send();
  xhReq.onload = function(response) {
    var json = JSON.parse(xhReq.responseText),
        temp = json.query.results.weather.rss.channel.item.condition.temp;
    speech('Jest teraz ' + temp + ' stopni');
  };
});
rec.addCommand(/szukaj(.*)/i, function(match){
  var text = encodeURIComponent(match[1].trim());
  open("http://google.pl/search?q=" + text);
});
rec.addCommand(/otwórz(.*)/i, function(match){
  var text = encodeURIComponent(match[1].trim());
  open('http://' + text);
});
rec.addCommand(/youtube(.*)/i, function(match) {
  var text = encodeURIComponent(match[1].trim());
  open('https://www.youtube.com/results?search_query=' + text);
});
rec.addCommand(/godzina/i, function() {
  speech(time());
  function time() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      return hours(h) + " " + minutes(m);
  }
  function hours(h) {
    var hoursArray = ["północ", "pierwsza", "druga", "trzecia", "czwarta", "piąta", "szósta", "siódma", "ósma", "dziewiąta",
                "dziesiąta", "jedenasta", "trzynasta", "czternasta", "pietnasta", "szesnasta", "siedemnasta",
                "osiemnasta", "dziewietnasta", "dwudziesta", "dwudziestapierwsza", "dwudziestadruga",
                "dwudziestatrzecia", "dwudziestaczwarta"];
    return hoursArray[h-1];
  }
  function minutes(num) {
    var lowNames = ["", "jeden", "dwa", "trzy",
                  "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć",
                 "dziesięć", "jedenaście", "dwanaście", "trzynasta", "czternaście",
                  "pietnaście", "szesnaście", "siedemnaście",
                  "osiemnaście", "dziewietnaście"],
        tensNames = ["dwadzieścia", "trzydzieści", "czterdzieści", "piędziesiąt"],
        tens, ones, result;
    if (num < lowNames.length) {
      result = lowNames[num];
    } else {
      tens = Math.floor(num / 10);
      ones = num % 10;
      result = tensNames[tens - 2] + " " + lowNames[ones];
    }
    return result;
  }
});
rec.start(function(support) {
  if(support) {
    var supportEl = document.getElementById('support');
    supportEl.hidden = true;
  }
});
