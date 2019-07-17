//this function is for responsiveness in the navigation
function ResponsiveNavvy() {
  var x = document.getElementById("nav");
  if (x.className === "Navigation") {
    x.className += " responsive";
  } else {
    x.className = "Navigation";
  }
}

function submitFunction() {
  if (document.getElementById("show").style.display === "none") {
    document.getElementById("show").style.display = "block";
  }
  window.scrollBy(0,600);
}

function currentYear() {
  var d = new Date();
  var n = d.getFullYear();
  document.getElementById("footer").innerHTML = n;
}