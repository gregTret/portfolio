var total = 0;
var foundTotal=0;
var completed=0;
var totalNull = 0;
var boxesUsed=0;
function myFunc(Language, Description) {
    refresh();

    var request = new XMLHttpRequest();
    var UD = Description.split(" ");
    var sizeOfUD = (UD.length);
    var linksFound = 0;
    var ID = [];
    var i;
    var x = 0;
    
    var link = 'https://api.stackexchange.com/2.2/search/advanced?page=1&order=desc&sort=activity&accepted=True&tagged=';
    var Title = Description;
    link += Language;
    link += '&title=';
    link += Title;
    link += '&site=stackoverflow&key=YClORTBMUx9otA1KojqEBg((';

    request.open('GET', link, true);
    request.onload = function() {
        var data = JSON.parse(this.response);
        console.log(data);
        console.log(data.items.length);
        iterate = (data.items.length);
        console.log(iterate);
        if (iterate == 0) {
             location.href="scripts/failed.php";
             return true;
        }
        for (i = 0; i < iterate; i++) {
            if (1 != outputTitles(x, UD, sizeOfUD, data.items[i].title.toLowerCase(), 0)) {
                linksFound = linksFound + 1;
                ID.push(data.items[i].accepted_answer_id);
            }
        }
        if (linksFound >= 1) {
            console.log("FOUND:" + linksFound);
            var max = 1;
            if (linksFound >= 4) {
                max = 3;
            } else {
                max = linksFound;
            }
            for (i = 0; i < max; i++) {
                link = "https://api.stackexchange.com/2.2/answers/"
                link += ID[i];
                link += "?order=desc&sort=activity&site=stackoverflow&key=YClORTBMUx9otA1KojqEBg((&filter=!*JxbB6N6yFUXnRae";
                var linkToQuestion="https://stackoverflow.com/a/"+(ID[i]);
                console.log(link);
                fetch(link)
                    .then(function(response) {
                        response.json().then(function(data) {
                            var sendID = [];
                            sendID.push(data.items[0].body);
                            dealWith(sendID,linkToQuestion,linksFound);
                        });
                    })
            }
        } else {
             location.href="scripts/failed.php";
             return true;
        }
    }
    request.send();
    //request.close();
}

function refresh() {
    document.getElementById('c').innerHTML = "";
    document.getElementById('d').innerHTML = "";
    document.getElementById('e').innerHTML = "";
    total = 0;
    totalNull = 0;
    completed = 0;
}

function dealWith(useful,lfu,totalFOUND) {
    var adjusted = String(useful);
    var re = /(.*?)<pre([\s\S]*?)(.*?)<\/code><\/pre>/;
    var re1 = /<code>([\s\S]*?)(.*?)<\/code>/;
    var trimmed = adjusted.match(re);
    adjusted = String(trimmed);
    trimmed = adjusted.match(re1);
    adjusted = String(trimmed);
    trimmed = adjusted.replace("<code>", "");
    adjusted = trimmed.replace("</code>", "");
    completed+=1;
    if (adjusted != "null") {
        total += 1;
        if (total == 1) {
            //document.getElementById('c').innerHTML += "<pre>" + adjusted + "</pre>";
            document.getElementById('c').innerHTML += adjusted;
            // document.getElementById('c').innerHTML += "<br>";
        	document.getElementById('link1').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>"; 
        	boxesUsed+=1;
        }
        if (total == 2) {
            //document.getElementById('d').innerHTML += "<pre>" + adjusted + "</pre>";
            document.getElementById('d').innerHTML += adjusted;
            //document.getElementById('d').innerHTML += "<br>";
        	document.getElementById('link2').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>"; 
        	boxesUsed+=1;
        }
        if (total == 3) {
            //document.getElementById('e').innerHTML += "<pre>" + adjusted + "</pre>";
            document.getElementById('e').innerHTML += adjusted;
            //document.getElementById('e').innerHTML += "<br>";
        	document.getElementById('link3').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>"; 
        	boxesUsed+=1;
        }

    }
    if (adjusted == "null") {
    	console.log("REASON HERE"+completed);
    	
        if (completed==0){
        	document.getElementById('c').innerHTML += "Oh No this result had no code, check out this link instead";
        	//document.getElementById('c').innerHTML += "<br>";
        	document.getElementById('link1').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>";
        	boxesUsed+=1;
        }
        if (completed==1){
        	document.getElementById('d').innerHTML += "Oh No this result had no code, check out this link instead";
        	//document.getElementById('d').innerHTML += "<br>";
        	document.getElementById('link2').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>"; 
        	boxesUsed+=1;
        }
        if (completed==2){
        	document.getElementById('e').innerHTML += "Oh No this result had no code, check out this link instead";
        	//document.getElementById('e').innerHTML += "<br>";
        	document.getElementById('link3').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>"; 
        	boxesUsed+=1;
        }
        if (completed==3){
        	document.getElementById('e').innerHTML += "Oh No this result had no code, check out this link instead";
        	//document.getElementById('e').innerHTML += "<br>";
        	document.getElementById('link3').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>"; 
        }

        console.log("FAILED SEARCH (Null result)" + totalNull);
    }
    if (1== totalFOUND) {
    	document.getElementById('d').innerHTML += "No results found, please alter your search parameters";
    	document.getElementById('e').innerHTML += "No results found, please alter your search parameters";
    }
    if (2==totalFOUND){
    	document.getElementById('e').innerHTML += "No results found, please alter your search parameters";
    }
}

function outputTitles(x, UD, sizeOfUD, title, fail) {
    if (x < sizeOfUD) {
        if (title.includes(UD[x].toLowerCase())) {
            if (fail == 1) {
                return 1;
            }
            fail = outputTitles(x + 1, UD, sizeOfUD, title, fail);
        } else {
            return 1;
        }
    }
    return fail;
}

function handleClick() {}

function setDefault() {
    document.getElementById("debugMode").click();
}

function changeTab(evt, Name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Name).style.display = "block";
    evt.currentTarget.className += " active";
}