//If function has Lorem in name it is in the class. If it has Ipsum in name it is outside the class.
'use strict';
var URL = "http://ebaer.se/wd3/projekt/REST.php/Lorem_Ipsum";
var listshowing = false;
var page = "";
var REST_Lorem = /** @class */ (function () {
    function REST_Lorem() {
    }
    return REST_Lorem;
}());
var li;
//Proved information
function LoremInfo(information) {
    window.li = information;
}
//Makes the list html
function loremList(page) {
    var loremlist = "";
    if (page == "index") {
        for (var i = 0; i < this.li.length; i++) {
            loremlist += "<p class='pli' onclick = 'activeIpsum(\"" + this.li[i].litext + "\")'>" + this.li[i].liname + "</p><br/>";
        }
    }
    else if (page == "handle") {
        for (var i = 0; i < this.li.length; i++) {
            loremlist += "<div class='dli'><p class='hli'>" + this.li[i].liname + "</p><a class='ahli'onclick ='changeIpsum(\"" + this.li[i].ID + "\",\"" + this.li[i].liname + "\",\"" + this.li[i].litext + "\")'>  Ändra</a><a class='ahli' onclick = 'deleteIpsum(\"" + this.li[i].ID + "\")'>  Ta bort</a><br/></div>";
        }
    }
    return loremlist;
}
//Function for making a new Lorem Ipsum
function newLorem(loremname, ipsumtext) {
    var liname = loremname;
    var litext = ipsumtext;
    //Removelinebreaks
    litext = this.LoremBreak(litext);
    //Send new Lorem Ipsum data
    var json = { "liname": liname, "litext": litext };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", URL, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(json));
    xmlhttp.onload = function () {
        location.reload();
    };
}
//Function for changing Lorem Ipsum data
function changeLorem(loremid, loremname, loremtext) {
    var liid = loremid;
    var liname = loremname;
    //Remove linebreaks
    var litext = this.LoremBreak(loremtext);
    //Send changes
    var json = { "ID": liid, "liname": liname, "litext": litext };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", URL + "/" + liid, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(json));
    xmlhttp.onload = function () {
        location.reload();
    };
}
//Function for deleting Lorem Ipsum
function LoremDelete(id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", URL + "/" + id, true);
    xmlhttp.send();
    xmlhttp.onload = function () {
        location.reload();
    };
}
//Removes linebreaks from text
function LoremBreak(brokentext) {
    var litext = brokentext;
    while (litext.indexOf('\n') > -1) {
        litext = litext.replace('\n', '*n');
    }
    return litext;
}
//Restores linebreaks to text
function LoremRestore(unbrokentext) {
    var lotext = unbrokentext;
    while (lotext.indexOf('*n') > -1) {
        lotext = lotext.replace('*n', '\n');
    }
    return lotext;
}
//Sends back html for showing the chosen Lorem Ipsum
function chosenLorem(litext) {
    var LoremIpsum = LoremRestore(litext);
    return "<pre id=loremtext>" + LoremIpsum + "</pre>";
}
//functions to ensure non-empty input fields
function LoremValuecheck(liname, litext) {
    if (liname != '' && litext != '') {
        return true;
    }
    else {
        return false;
    }
}
//XMLHttp requests
var LIinfo = new XMLHttpRequest();
var LI = new REST_Lorem();
//Information gathering
LIinfo.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var information = JSON.parse(this.responseText);
        LI.LoremInfo(information);
        IpsumList();
    }
};
LIinfo.open("GET", URL, true);
LIinfo.send();
//Makes sure the class is loaded
//if (LI !== undefined){
//Check if on index.html by looking for envelop div
if (document.getElementById("envelop") != null) {
    page = "index";
    //Create the list
    function IpsumList() {
        document.getElementById("lilist").innerHTML = LI.loremList(page);
    }
    //Show the chosen Lorem Ipsum
    function activeIpsum(ipsum) {
        document.getElementById("litext").innerHTML = LI.chosenLorem(ipsum);
    }
    //Show/hide the Lorem Ipsum list on mobile
    if (!listshowing) {
        document.getElementById("lilist").style.display = "block";
        listshowing = true;
    }
    else {
        document.getElementById("lilist").style.display = "none";
        listshowing = false;
    }
}
//Check if on handle.html by looking for envelophandle div
else if (document.getElementById("envelophandle") != null) {
    page = "handle";
    //Create the list
    document.getElementById("handlelist").innerHTML = LI.loremList(page);
    //Functionality for submitting new Lorem Ipsum:
    //submit listeners
    document.getElementById("newlorem").addEventListener("click", newIpsum);
    //Calling the creation function
    function newIpsum() {
        var liname = document.getElementById("liname").value;
        var litext = document.getElementById("litext").value;
        if (LI.LoremValuecheck) {
            LI.newLorem(liname, litext);
        }
        else {
            IpsumWarning();
        }
    }
    //Function for making changes to a Lorem Ipsum
    function changeIpsum(liid, liname, litext) {
        var loremid = liid;
        var loremname = liname;
        var loremtext = LoremRestore(litext);
        dformEl.innerHTML = '<form action="#" method="#" id="newtext"><input type="text" name="liname" id="liname" value = "' + liname + '"><br/><br/><textarea name="litext" id="litext" cols="30" rows="10">' + loremtext + '</textarea><br/><input type="hidden" name="liid" id="liid" value="' + liid + '"><input type="button" value="submit" id="submitbutton"></form>';
        document.getElementById("submitbutton").addEventListener("click", function () {
            loremid = document.getElementById("liid").value;
            loremname = document.getElementById("liname").value;
            loremtext = document.getElementById("litext").value;
            if (LI.LoremValuecheck(loremname, loremtext)) {
                LI.changeLorem(loremid, loremname, loremtext);
            }
            else {
                IpsumWarning();
            }
        });
    }
    //Delete Lorem Ipsum
    function deleteIpsum(liid) {
        LI.LoremDelete(liid);
    }
    //warning for empty inputfield
    function IpsumWarning() {
        document.getElementById("warning").innerHTML = "Fälten får EJ vara tomma!";
    }
}
