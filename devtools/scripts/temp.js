// New Code
var date;
var totalNumber;
var value=[];

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
        data = JSON.parse(this.response);
        console.log(data);
        var iterate = (data.items.length);

        if (iterate == 0) {
             location.href="files/failed.php";
             return true;
        }else{
            console.log("Finding the best...");
            for (i=0;i<iterate;i++){
                value[i]=estimate(data[i]);
            }
        }
    }
    request.send();
}



                // link = "https://api.stackexchange.com/2.2/answers/"
                // link += ID[i];
                // link += "?order=desc&sort=activity&site=stackoverflow&key=YClORTBMUx9otA1KojqEBg((&filter=!*JxbB6N6yFUXnRae";
                // var linkToQuestion="https://stackoverflow.com/a/"+(ID[i]);
                // //console.log(link);
                // fetch(link)
                //     .then(function(response) {
                //         response.json().then(function(data) {
                //             var sendID = [];
                //             sendID.push(data.items[0].body);
                //             dealWith(sendID,linkToQuestion,linksFound);
                //         });
                //     })


function estimate(current){
    

}


function refresh() {
    document.getElementById('c').innerHTML = "";
    document.getElementById('d').innerHTML = "";
    document.getElementById('e').innerHTML = "";
    total = 0;
    totalNull = 0;
    completed = 0;
    box=[0,0,0]
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
    var myCase=0;
    myCase=correct(completed,box,adjusted);



    if (myCase==0){
        if (box[0]==0){
            box[0]=1;
            document.getElementById('c').innerHTML += adjusted;
            if (linkDuplicate[0]==0){
                linkDuplicate[0]=1;
                document.getElementById('link1').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>";
            }
        }else if (box[1]==0){
            box[1]=1;
            document.getElementById('d').innerHTML += adjusted;
            if (linkDuplicate[1]==0){
                linkDuplicate[1]=1;
                document.getElementById('link2').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>";
            }
        }else if(box[2]==0){
            box[2]=1;
            document.getElementById('e').innerHTML += adjusted;
            if (linkDuplicate[2]==0){
                linkDuplicate[2]=1;
                document.getElementById('link3').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>";
            }
        }
    }else{
        if (box[0]==0){
            box[0]=1;
            document.getElementById('c').innerHTML += "Oh No this result had no code, check out the link to the left instead";
            if (linkDuplicate[0]==0){
                linkDuplicate[0]=1;
                document.getElementById('link1').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>";
            }
        }else if (box[1]==0){
            box[1]=1;
            document.getElementById('d').innerHTML += "Oh No this result had no code, check out the link underneath instead";
            if (linkDuplicate[1]==0){
                linkDuplicate[1]=1;
                document.getElementById('link2').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>";
            }
        }else if(box[2]==0){
            box[2]=1;
            document.getElementById('e').innerHTML += "Oh No this result had no code, check out this link underneath instead";
            if (linkDuplicate[2]==0){
                linkDuplicate[2]=1;
                document.getElementById('link3').innerHTML += "<a href=\""+lfu+"\">" + "link" + "<\a>";
            }
        }
    }

    if (1== totalFOUND) {
        document.getElementById('d').innerHTML += "No results found, please alter your search parameters";
        document.getElementById('e').innerHTML += "No results found, please alter your search parameters";
    }
    if (2==totalFOUND){
        document.getElementById('e').innerHTML += "No results found, please alter your search parameters";
    }
}


function correct(run,array,text){
    if (text!="null"){
        return 0;
    }else{
        return 1;
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