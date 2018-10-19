'use strict';
var URL = "http://ebaer.se/wd3/projekt/REST.php/Lorem_Ipsum"

//Elements
var lilistEl = document.getElementById("lilist");//Div for list of available Lorem Ipsum
var litextEl = document.getElementById("litext");//Div for text of chosen Lorem Ipsum

//XMLHttp requests
var LIinfo = new XMLHttpRequest();

//Infohämtning
LIinfo.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var information = JSON.parse(this.responseText);
        /*functionname(information.information.information)*/
        loremList(information);
        console.log(information);
    }
};

LIinfo.open("GET", URL, true);
LIinfo.send();

function loremList(lorem){
    for (var i = 0; i < lorem.length; i++) {
        lilistEl.innerHTML += "<p class='pli' onclick = 'activeLorem("+lorem[i].litext+")'>"+lorem[i].liname+"</p><br/>";
    }
}

function activeLorem(litext){
    //var lorem = string(litext);
    litextEl.innerHTML = "<p id=loremtext>"+litext+"</p>";
}