'use strict';
var URL = "http://ebaer.se/wd3/projekt/REST.php/Lorem_Ipsum"

//Elements
var handlelistEl = document.getElementById("handlelist");//Div for list of available Lorem Ipsum
var dformEl =document.getElementById("dform");//Div for the form.
//XMLHttp requests
var LoremInfo = new XMLHttpRequest();

//Infohämtning
LoremInfo.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var information = JSON.parse(this.responseText);
        /*functionname(information.information.information)*/
        IpsumList(information);
        console.log(information);
    }
};

LoremInfo.open("GET", URL, true);
LoremInfo.send();
//Makes list of Lorem Ipsum
function IpsumList(lorem){
    for (var i = 0; i < lorem.length; i++) {
        handlelistEl.innerHTML += "<p class='hli'>"+lorem[i].liname+"</p><a class='ahli'onclick ='changeLorem("+lorem[i].ID+","+lorem[i].liname+","+lorem[i].litext+")>  Ändra</a><a class='ahli' onclick = 'deleteLorem("+lorem[i].ID+")'>  Ta bort</a><br/>";
    }
}

//Function for making changes to a Lorem Ipsum
function changeLorem(liid, liname,litext){
    dformEl.innerHTML = '<form action="#" id="newtext"><input type="text" name="liname" id="liname" value = "'+liname+'"><br/><br/><textarea name="litext" id="litext" value="'+litext+'" cols="30" rows="10"></textarea><br/><input type="hidden" name="liid" id="liid" value="'+liid+'"><input type="submit" value="submit" id="submitbutton"></form>'
    window.submitEl = document.getElementById("submitbutton");
}
//submit listener
onlick.submitEl = changeIpsum;

//function for csending changes of a Lorem Ipsum
function changeIpsum(){
    var liid = document.getElementById("liid").value;
    var liname = document.getElementById("liname").value;
    var litext = document.getElementById("litext").value;
    //if any empty value: reload page
    if( !(liid != '' && liname != '' && litext != '') ){ 
        location.reload();
    }

    var json = {"ID":liid, "liname":liname, "litext":litext};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", URL+"/"+liid, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send( JSON.stringify(json) );

    xmlhttp.onload = function() {
            location.reload();
    }
} 

//function for deleting Lorem Ipsum
function deleteIpsum(id){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", URL+"/"+id, true);
    xmlhttp.send();

    xmlhttp.onload = function() {
        location.reload();
    }
}