var mainData;
var currentDate;

var pos=0,neg=0,neu=0;
const monthNames = ["null","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function main(whereToPlace,graphTitle,desiredDate,size){
	currentDate=desiredDate;
	document.getElementById("viewingDate").innerHTML=convertToDayVisible(desiredDate)+" Sentiment"
	for (var i = 0; i < mainData.length; i++){
    	var obj = mainData[i];
	    for (var key in obj){
	        var attrName = key;
	        var attrValue = obj[key];

	        if (attrName!='classifications'){
	        	//document.getElementById("content").innerHTML+=(attrName+":"+attrValue)+"<br>"
	        }else{
	        	for (var x = 0; x < mainData[i][attrName].length; x++){
	        		var next = mainData[i][attrName][x]
	    			for (var item in next){
	        			var value= (next[item])
	        			var name= (item)
	        			if (name=='tag_name'){
				        	if (value.localeCompare("Positive")==0){
				        		pos+=1
				        	}else if(value=="Negative"){
				        		neg+=1
				        	}else{
				        		neu+=1
				        	}
	        			}
	        		}
	        	}
	        }
	    }
	}

	var data = [{
	  values: [pos,neg,neu],
	  labels: ['Positive', 'Negative', 'Neutral'],
	  hole: size,
	  type: 'pie',
	   marker: {
	     colors:   ['rgb(126, 252, 160)', 'rgb(138, 6, 69)', 'rgb(34, 53, 101)']
	  },
	}];

	var layout = {
	  title: graphTitle,
	  height: 400,
	  width: 500
	};
	Plotly.newPlot(whereToPlace, data, layout);

}

function getData(desiredDate){
	jQuery.ajax({
	    url: 'https://raw.githubusercontent.com/gregTret/dataSets/master/worldnews/'+desiredDate+'.json',
	    type: 'get',
	    dataType: 'text',
	    success: function(data) {
	    	pos=0,neg=0,neu=0;
	        mainData= (JSON.parse(data))
	        main('worldnews','World News',desiredDate,0.9)
	    },
	    error: function(jqXHR, textStatus, errorThrow){
	        console.log(textStatus);
	    }
	});
	jQuery.ajax({
	    url: 'https://raw.githubusercontent.com/gregTret/dataSets/master/upliftingnews/'+desiredDate+'.json',
	    type: 'get',
	    dataType: 'text',
	    success: function(data) {
	    	pos=0,neg=0,neu=0;
	        mainData= (JSON.parse(data))
	        main('upliftingnews','Uplifting News',desiredDate,0.9)
	    },
	    error: function(jqXHR, textStatus, errorThrow){
	        console.log(textStatus);
	    }
	});
	jQuery.ajax({
	    url: 'https://raw.githubusercontent.com/gregTret/dataSets/master/politics/'+desiredDate+'.json',
	    type: 'get',
	    dataType: 'text',
	    success: function(data) {
	    	pos=0,neg=0,neu=0;
	        mainData= (JSON.parse(data))
	        main('politics','Politics',desiredDate,0.9)
	    },
	    error: function(jqXHR, textStatus, errorThrow){
	        console.log(textStatus);
	    }
	});
}

function currentDate(){
	return currentDate
}
function convertToDay(selected){
	var res = selected.split("_");
	return monthNames[res[0]].toString() +'_' + res[1].toString() +'_' +res[2].toString()
}

function convertToDayVisible(selected){
	var res = selected.split("_");
		return monthNames[res[0]].toString() +' ' + res[1].toString() +' ' +res[2].toString()
}



function startingDate(){
	return "8_11_2020"
}
function convertAlt(dateSel){
	return (replaceAll(dateSel,"_", "/"))
}

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

function todayDate(){
	dateObj= new Date();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	return (month+'_'+day+'_'+year)
}

function days_between(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}


function setInputCalendar(desiredDate){ 
	 document.getElementById("calendarSelect").innerHTML=""
	 var calendar=document.getElementById("calendarSelect");
	 calIn=document.createElement('input');
	 calIn.id='calIn';
	 calIn.setAttribute("type", "text");
	 calIn.setAttribute("data-role", "calendarpicker");
	 calIn.setAttribute("data-min-date", convertAlt(startingDate()));
	 calIn.setAttribute("data-max-date", convertAlt(todayDate()));
	 calIn.setAttribute("data-buttons", false);
	 calIn.setAttribute("data-on-day-click","getValue");

	 calIn.setAttribute("data-preset",convertAlt(todayDate()));

	

	 calendar.appendChild(calIn)
	 getData(desiredDate)
}





