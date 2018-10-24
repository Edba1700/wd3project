'use strict';
var URL = "http://ebaer.se/wd3/projekt/REST.php/Lorem_Ipsum"
var listshowing = false;

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
        activeLorem("");
        console.log(information);
    }
};

LIinfo.open("GET", URL, true);
LIinfo.send();

function loremList(lorem){
    for (var i = 0; i < lorem.length; i++) {
        //var ipsumtext = string(lorem[i].litext);
        lilistEl.innerHTML += "<p class='pli' onclick = 'activeLorem(\""+lorem[i].litext+"\")'>"+lorem[i].liname+"</p><br/>";
    }
}

//Show the chosen Lorem Ipsum
function activeLorem(litext){
    var LoremIpsum = breakrestore(litext);
    litextEl.innerHTML = "<pre id=loremtext>"+LoremIpsum+"</pre>";
}

//If list button is visible.
if(document.getElementById("displaylist")!= null){
    document.getElementById("displaylist").addEventListener("click",showList);
}

//Show/hide the list on mobile
function showList(){
    if(!listshowing){
        document.getElementById("lilist").style.display = "block";
        listshowing = true;
    }
    else{
        document.getElementById("lilist").style.display = "none";
        listshowing = false;
    }
}