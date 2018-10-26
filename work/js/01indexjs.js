'use strict';
var URL = "http://ebaer.se/wd3/projekt/REST.php/Lorem_Ipsum"
var listshowing = false;

//Elements
var envelopEl = document.getElementById("envelop"); //Main container div in index.html
var handleEl = document.getElementById("envelophandle"); //Main container div in handle.html
var lilistEl = document.getElementById("lilist");//Div for list of available Lorem Ipsum
var litextEl = document.getElementById("litext");//Div for text of chosen Lorem Ipsum

//XMLHttp requests
var LIinfo = new XMLHttpRequest();

//Infogathering
LIinfo.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var information = JSON.parse(this.responseText);
        //Send info to loremList if 'envelop' div exists
        if (envelopEl != null){
            loremList(information);
        }
        //Send info to IpsumList if 'envelophandle' div exists
        else if(handleEl != null){
            IpsumList(information);
        }
    }
};

LIinfo.open("GET", URL, true);
LIinfo.send();

//Create the list of Lorem Ipsum with onclick that shows the chosen text
function loremList(lorem){
    for (var i = 0; i < lorem.length; i++) {
        lilistEl.innerHTML += "<p class='pli' onclick = 'activeLorem(\""+lorem[i].litext+"\")'>"+lorem[i].liname+"</p><br/>";
    }
}

//Show the chosen Lorem Ipsum
function activeLorem(litext){
    var LoremIpsum = breakrestore(litext);//restores linebreaks
    litextEl.innerHTML = "<pre id=loremtext>"+LoremIpsum+"</pre>";
}

//If list button is visible.
if(document.getElementById("displaylist")!= null){
    document.getElementById("displaylist").addEventListener("click",showList);//Click listener on list button to Show List
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