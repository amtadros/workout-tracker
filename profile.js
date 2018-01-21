/* Mandy Tadros
*  Workout Tracker
*/

function openNav() {
  console.log("openNav reached");
  var navStatus = document.getElementById("navBar");
  if (navStatus.className === "topNav") {
    console.log("if of nav");
    navStatus.className += " compressed";
  } else {
    console.log("else of nav");
    navStatus.className = "topNav";
  }  
}


/*event listeners*/
function createEventListeners() {
  console.log("event listenters reached");
  var open = document.getElementById("hamburgerMenu");
  if(open.addEventListener){
    open.addEventListener("click", openNav, false);
  } else if(open.attachEvent){
    open.attachEvent("onclick", openNav);
  }
}

function pageSetup(){
  createEventListeners();
}

/*runs after page loads; calls other functions*/
if (window.addEventListener) {
  window.addEventListener("load", pageSetup, false);
} else if(window.attachEvent) {
  window.attachEvent("onload", pageSetup);
}