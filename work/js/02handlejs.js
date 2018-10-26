'use strict';
var URL = "http://ebaer.se/wd3/projekt/REST.php/Lorem_Ipsum"

//Elements
var handlelistEl = document.getElementById("handlelist");//Div for list of available Lorem Ipsum
var dformEl = document.getElementById("dform");//Div for the form.
var warningEl = document.getElementById("warning");//Warning text

//Makes list of Lorem Ipsum with onclick commands to change or delete chosen Lorem Ipsum
function IpsumList(lorem){
    for (var i = 0; i < lorem.length; i++) {
        handlelistEl.innerHTML += "<div class='dli'><p class='hli'>"+lorem[i].liname+"</p><a class='ahli'onclick ='changeLorem(\""+lorem[i].ID+"\",\""+lorem[i].liname+"\",\""+lorem[i].litext+"\")'>  Ändra</a><a class='ahli' onclick = 'deleteIpsum(\""+lorem[i].ID+"\")'>  Ta bort</a><br/></div>";
    }
}

//Function for making a new Lorem Ipsum
function newIpsum(){
    var liname = document.getElementById("liname").value;
    var litext = document.getElementById("litext").value;
 
    //Removes linebreaks
    litext = breaklines(litext);
    //Sends the data
    var json = {"liname":liname, "litext":litext};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", URL, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send( JSON.stringify(json) );

    xmlhttp.onload = function() {
            location.reload();
    }
}

//Function for removing linebreaks
function breaklines(broken){
    var brokentext = broken;
    while(brokentext.indexOf('\n')>-1){
        brokentext=brokentext.replace('\n','*n');
    }
    return brokentext;
}
//Function for restoring linebreaks
function breakrestore(unbroken){
    var breakee = unbroken;
    while(breakee.indexOf('*n')>-1){
        breakee = breakee.replace('*n','\n');
    }
    return breakee;
}
//Function for making changes to a Lorem Ipsum
function changeLorem(liid, liname,litext){
    var LoremIpsum = breakrestore(litext);
    //Makes a form with the fields filled in with the chosen Lorem Ipsum
    dformEl.innerHTML = '<form action="#" method="#" id="newtext"><input type="text" name="liname" id="liname" value = "'+liname+'"><br/><br/><textarea name="litext" id="litext" cols="30" rows="10">'+LoremIpsum+'</textarea><br/><input type="hidden" name="liid" id="liid" value="'+liid+'"><input type="button" value="submit" id="submitbutton"></form>'
    document.getElementById("submitbutton").addEventListener("click",changeIpsumcheck);//Click listener for the submitbutton
}


//function for sending changes of a Lorem Ipsum
function changeIpsum(){
    var liid = document.getElementById("liid").value;
    var liname = document.getElementById("liname").value;
    var litext = document.getElementById("litext").value;

    //Removes linebreaks
    litext = breaklines(litext);

    //Sends data
    var json = {"ID":liid, "liname":liname, "litext":litext};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", URL+"/"+liid, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send( JSON.stringify(json) );

    xmlhttp.onload = function() {
            location.reload();
    }
} 

//function for deleting chosen Lorem Ipsum
function deleteIpsum(id){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", URL+"/"+id, true);
    xmlhttp.send();

    xmlhttp.onload = function() {
        location.reload();
    }
}


//functions to ensure non-empty input fields
function valuecheck(){
    var liname = document.getElementById("liname").value;
    var litext = document.getElementById("litext").value;
    if (liname != '' && litext != ''){
        return true;
    }
    else{
        return false;
    }
}

//Functions to ensure imput fields are not empty on submit
function newIpsumcheck(){
    if (valuecheck()){
        newIpsum();
    }
    else{
        warningEl.innerHTML = "Fälten får EJ vara tomma!";
    }
}

function changeIpsumcheck(){
    if (valuecheck()){
        changeIpsum();
    }
    else{
        warningEl.innerHTML = "Fälten får EJ vara tomma!";
    }
}
//submit listener for new lorem ipsum
document.getElementById("newlorem").addEventListener("click",newIpsumcheck);


