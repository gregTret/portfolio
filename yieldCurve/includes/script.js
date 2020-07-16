var remove=1;

function plotProperly(normal,II,ts,year,backgroundColour,multiplier){
	allData=[]
	count=0
	ribbonY=[]
	previous=0
	ribbon=[]
	cols=["1", "2", "3", "6", "12", "24", "36", "60", "84", "120", "240", "360"]
	titleOfGraph='Yield Curve '+year
	for (breaks=0;breaks<ts;breaks++){
		if (breaks==0){
			previous=II[breaks]
			ribbon.push(normal[breaks])
			ribbonY.push(0)
		}else{
			if (previous!=II[breaks]){
				count++
				if (previous==1){
					var dd1 = {
						z:ribbon,
						y:ribbonY,
						x:cols,
						type: 'surface',
						showscale: false,
				    	colorscale: [
				        	[0, 'rgb(0, 0, 0)'],
				        	[1,'rgb(87, 87, 87)']
				    	]
					};
					ribbon=[]
					ribbonY=[]
					ribbon.push(normal[breaks])
					ribbonY.push(breaks*multiplier)
					allData.push(dd1)
				}else{
						var dd2 = {
							z:ribbon,
							y:ribbonY,
							x:cols,
							type: 'surface',
							showscale: false,
					    	colorscale: [
					        	[0, 'rgb(150, 0, 0)'],
					        	[1,'rgb(0, 0, 0)']
					    	]
						};
					ribbon=[]
					ribbonY=[]
					ribbon.push(normal[breaks])
					ribbonY.push(breaks*multiplier)
					allData.push(dd2)
				}
			}else{
				ribbon.push(normal[breaks])
				ribbonY.push(breaks*multiplier)
			}
		}
		previous=II[breaks]
	}

	if (previous==1){
					var dd1 = {
						z:ribbon,
						y:ribbonY,
						x:cols,
						type: 'surface',
						showscale: false,
				    	colorscale: [
				        	[0, 'rgb(0, 0, 0)'],
				        	[1,'rgb(87, 87, 87)']
				    	]
					};
					ribbon=[]
					ribbonY=[]
					allData.push(dd1)
				}else{
						var dd2 = {
							z:ribbon,
							y:ribbonY,
							x:cols,
							type: 'surface',
							showscale: false,
					    	colorscale: [
					        	[0, 'rgb(150, 0, 0)'],
					        	[1,'rgb(0, 0, 0)']
					    	]
						};
					ribbon=[]
					ribbonY=[]
					allData.push(dd2)
				}


	var layout = {
	  plot_bgcolor:"black",
      paper_bgcolor:backgroundColour,
      title: titleOfGraph,
	  "titlefont": {
	    "size": 30,
	  },
	  scene: {xaxis:{title: 'Months until Maturity'},
		yaxis:{title: 'Day of year'},
		zaxis:{title: 'Yield'},
	  	camera: {eye: {x: -1.7, y: -0.7, z: 0}}},
	};

	var config = {responsive: true}

	Plotly.newPlot('myDiv',allData ,layout,config)
	if (remove==1){
		document.getElementById("placeholder").remove();
		remove=0
	}
}


function generate(output,year,BC){
	xVal=[]
	dates=[]
	days=[]
	mainOuter=[]
	keys=[]
	grabKeys=0
	II=[]
	multiplier=0.5
	for (var key in output) {
		mainInner=[]
		first=0
	    if (output.hasOwnProperty(key)) {
	    	for( let prop in output[key]){
	    		if (grabKeys==0 && first!=0){
	    			keys.push(prop)
	    		}
	    		if (first==0){
	    			dates.push(output[key][prop] )
	    			first++
	    		}
	    		else{
	    			mainInner.push(output[key][prop])
	    		}
			}

		mainOuter.push(mainInner)
		mainOuter.push(mainInner)
		grabKeys+=multiplier
		days.push(grabKeys)  
		days.push(grabKeys)
	    }
	}

	mainOuter.pop()


	for (i=0;i<days.length;i++){
		var previous=0.0
		var added=0
		var first=0

		for (x=0;x<keys.length;x++){
			if (mainOuter[i]!=undefined) {
				if (first!=0){
					if (mainOuter[i][x]<previous-0.01){
						if (added==0){
							added=1
							II.push(-1)
						}
					}
					previous=mainOuter[i][x]
				}else{
					first=1
				}
			}
		}
		if (added==0){
			II.push(1)
		}
	}

	plotProperly(mainOuter,II,mainOuter.length,year,BC,multiplier)
}


function descriptionGraphs(backgroundColour){
	var Normal = {
	  y: [1,1.3,1.5,1.9,2.2,3],
	  x: [1,2,3,4,5,6],
	  type: 'scatter',
	  name: 'Normal',
	  line: {
	    color: 'rgb(0, 0, 0)',
	    width: 1
	  }
	};

	var Inverted = {
		y: [1.2,0.8,0.6,0.5,1,2],
	    x: [1,2,3,4,5,6],
	  	type: 'scatter',
	  	name: 'Inverted',
	  	line: {
	    	color: 'rgb(150, 0, 0)',
	    	width: 1
	  	}
	};
	var Flat = {
		y: [0.6,0.7,0.7,0.7,0.8,0.8],
	    x: [1,2,3,4,5,6],
	  	type: 'scatter',
	  	name: 'Flat',
	  	line: {
	   		color: 'rgb(150, 150, 150)',
	    	width: 1
	  	}
	};

	var layout = {
	  plot_bgcolor:backgroundColour,
      paper_bgcolor:backgroundColour,

      title: 'Types of Yield Curves',
	  xaxis: {
	    title: 'Time',
	    showgrid: false,
	    zeroline: false
	  },
	  yaxis: {
	    title: 'Yield',
	    showline: false
	  }

	};

	var data = [Normal, Inverted,Flat];

	Plotly.newPlot('descriptionGraph', data,layout);
}