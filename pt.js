/* Mandy Tadros
*  WEB 114 - Final Project
*  11/22/2017
*/

//array
var instructionsArray = ["Put R foot on step. Keep R leg straight. Lean forward until you feel stretch in hamstring. Return to stand. Repeat 10 times then perform on L leg"
                        ,"Put R foot on step. Keep R leg straight. Reach left arm over right side. Lean forward until you feel stretch in hamstring. Return to stand. Repeat 10 times then perform on L leg"
                        ,"Step back with L leg and bend L knee. Point right foot to ceiling and reach for R foot until you feel astretch in your hamstring. Repeat 10 times then perform on L leg."
                        ,"Put R leg on hip level surface. Have femur in line with pelvis and knee at 90 degree angle. L foot and hips should point forwards. Lean toward table return to stand. Repeat 10 times then perform on L leg."
                        ,"Lunge forward with R leg. As you lunge, rotate upper body toward right. Return to stand. Repeat 15 times then perform on L leg."
                        ,"Put hands on wall. Step R foot forward. Keep L leg straight. Lean forward and bend R knee until you feel stretch in calf. Return to stand. Repeat 10 times then perform with L leg forward."];

/*remove select (dropdown) defaults*/
function removeDefaults () {
  var defaulted = document.getElementsByTagName("select"); //document.getElementsByTagName
  for (var i=0; i<defaulted.length; i++){ //for loop, var, assignment operator, & increment operator
    defaulted[i].selectedIndex = -1;
  }
}

// function checkDate () {
//   if(!Modernizr.inputtypes.date){
//     document.getElementById("date").type = "text";
//   }
// }

function openNav() {
  console.log("openNav reached");
  document.getElementById("sideNav").style.width = "20%"; //document.getElementById.stlye
  document.getElementById("overlay-outer").style.float = "right";
}

function closeNav() {
  console.log("closeNav reached");
  document.getElementById("sideNav").style.width = "0";
  document.getElementById("overlay-outer").style.float = "none";
}

/*display instructions and number of reps dropdown when checkbox is selected*/
function specialInstructions() {
  var stretchElements = document.querySelectorAll("#stretches input");
  var instructions = document.querySelectorAll(".instructions"); //querySelectorAll
  var reps = document.getElementsByClassName("reps");
  //console.log(stretchElements.length);
  for (var i=0; i<stretchElements.length; i++) {
    //console.log(stretchElements[i]);
     if(stretchElements[i].checked){ //if...else if
        instructions[i].style.display="block"; //querySelectorAll changing style of class
        reps[i].style.display="block";
        instructions[i].innerHTML = instructionsArray[i];
     } else if(!stretchElements[i].checked) { //not operator
        instructions[i].style.display="none";
        //console.log(document.getElementsByClassName("reps")[i].selectedIndex);
        reps[i].style.display="none";
     }
  }
}

/*tally number of stretches selected*/
function stretchTotal() {
  var stretchElements = document.querySelectorAll("#stretches input");
  var count = 0;
  for (var i=0; i<stretchElements.length; i++){
    if(stretchElements[i].checked){
      count++;
    }
  }
  document.getElementById("stretchTally").innerHTML = count; //document.getElementById("").innerHTML
}

function validateEntry() {
  var dateField = document.getElementById("date");
  var stretchElements = document.querySelectorAll("#stretches input");
  var painField = document.getElementById("painValue");
  var count = 0;

  for (var i=0; i<stretchElements.length; i++){
    if(stretchElements[i].checked){
      count++;
    }
  }

  if (dateField.value == "") { //document.getElementById().value, equal operator, if...else
    window.alert("Please enter a date.");
  } else if (dateField.value != "" && (painField.selectedIndex === -1 || count===0)){ //And & Or logical operators, not equal operator, & strict equal
    window.alert("Please enter a stretch and pain level.");
    console.log(dateField.value);
    console.log(count);
    console.log(painField.selectedIndex);
  } else {
    window.alert("Submission successful!"); //window.alert()
  }
}


function emailPrompt(){
  window.prompt("Enter email to receive weekly newsletter on your progress:"); //window.prompt()
}

/*event listeners*/
function createEventListeners() {
  console.log("event listenters reached");
  var open = document.getElementById("hamburgerMenu");
  if(open.addEventListener){
    open.addEventListener("click", openNav, false);
  } else if(hamburgerMenu.attachEvent){
    open.attachEvent("onclick", openNav);
  }

  var close = document.getElementById("closeButton");
  if(close.addEventListener){
    close.addEventListener("click", closeNav, false);
  } else if(close.attachEvent){
    close.attachEvent("onclick", closeNav);
  }

  var stretchCheck = document.getElementById("stretches");
  if(stretchCheck.addEventListener) {
      stretchCheck.addEventListener("change", function (){
        specialInstructions();
        stretchTotal();
      }
      , false);
  } else if (stretchCheck.attachEvent) {
      stretchCheck.attachEvent("onchange", function (){
        specialInstructions();
        stretchTotal();
      });
  }

  var save = document.getElementById("buttonContainer")
  if(save.addEventListener){
    save.addEventListener("click", validateEntry, false);
  } else if (save.attachEvent){
    save.attachEvent("onclick", validateEntry);
  }

  var email = document.getElementById("email")
  if(email.addEventListener){
    email.addEventListener("click", emailPrompt, false);
  } else if (email.attachEvent){
    email.attachEvent("onclick", emailPrompt);
  }
}

function pageSetup(){
  console.log("page loaded");
  //console.log(document.getElementById("date").value);
  removeDefaults();
  createEventListeners();
}

/*runs after page loads; calls other functions*/
if (window.addEventListener) {
  window.addEventListener("load", pageSetup, false);
} else if(window.attachEvent) {
  window.attachEvent("onload", pageSetup);
}
