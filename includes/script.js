function alterButton(buttonId,buttonTitleId){
	document.getElementById(buttonId).className = "imageStyle2";
}

function revertButton(buttonId,buttonTitleId){
	document.getElementById(buttonId).className = "imageStyle1";
	document.getElementById(buttonTitleId).className = "absolute-text-invisible";
}

function goToLink(link){
	window.location.href=(link);
}