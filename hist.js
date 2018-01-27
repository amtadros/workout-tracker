/* Mandy Tadros
*  Workout Tracker
*/

/*define global variables*/
var today = new Date();
var defaultYearValue = today.getFullYear();
var defaultMonthValue = today.getMonth(); //returns 0-11
var defaultDate = today.getDate(); //returns 1-31
var displayedYear = defaultYearValue; //global variablle so that functions know which year is currently displayed on screen
var displayedMonth = defaultMonthValue; //global variablle so that functions know which month is currently displayed on screen
var monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var table = document.getElementById("calTable");
var dateHolder = [];
var cellInd = "";
var workoutHistory = [];
var descHistory = [];
var scoreHistory = [];

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

/*Function to populate month name, year, and populate dates (adding or removing table rows as needed)*/
function printCalendar(year = defaultYearValue, month = defaultMonthValue) { //set defaults for parameters to today's year and date if not provided
  var thisDate = new Date (year, month);
  var thisYear = thisDate.getFullYear();
  var thisMonth = thisDate.getMonth();
  var dateValue = thisDate.getDate(); //returns 1-31
  var dayValue = thisDate.getDay(); //returns 0-6
  var firstDate = new Date(year, month, 1);
  var firstDayValue = firstDate.getDay(); //to know which day on first row to start on
  var numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();

  /*console.log("month in print cal: " + month);
  console.log("year in print cal: " + year);*/
	
  /*Print moth name & year*/
  document.getElementById("monthLabel").innerHTML = monthNameArray[month];
  document.getElementById("yearLabel").innerHTML = thisYear;
  /*Add an extra row to table if needed*/
  if(numberOfDaysInMonth + firstDayValue > 35){
  	var row = table.insertRow(6);
  	var cellIdBase = parseInt(35, 10);
  	var numberCellsToAdd = (numberOfDaysInMonth + firstDayValue) - 35;
  	for (var i=0; i< numberCellsToAdd; i++){
  		var newCellId = cellIdBase + i;
  		row.insertCell(i).setAttribute("id", "c" + newCellId);
  	}
  }
  /*Populate calendar dates*/
  var i=0;
  do {
    document.getElementById("c" + firstDayValue).innerHTML = i+1;
    dateHolder.push(i+1);
    i++;
    firstDayValue++;
  } while (i<numberOfDaysInMonth);
}

/*Function to remove data from calendar so that navigation between months doesn't cause overlap*/
function clearCalendar() {
	for (var i = 0; i<35; i++) {
	  document.getElementById("c"+i).innerHTML ="";
	}
	if(table.rows.length >6){
	  table.deleteRow(6);
	}
  dateHolder.length =0;
}

/*Function to move to next month*/
function nextMonth(){
	clearCalendar();
	var newMonth ="";
	var newYear=0;
	if (displayedMonth == 11) {
	  newMonth = 0;
	  newYear = displayedYear + 1;
    	  displayedMonth = 0;
    	  displayedYear = displayedYear + 1;
	} else {
	  newMonth = displayedMonth+ 1;
    	  displayedMonth = displayedMonth + 1;
          newYear = displayedYear;
	}
	//console.log("newMonth: " + newMonth);
	//console.log("newYear: " + newYear);
	//console.log("displayedMonth: " + displayedMonth);
	//console.log("displayedYear: " + displayedYear);
	printCalendar(newYear, newMonth);
}

/*Function to move to next month*/
function previousMonth(){
	clearCalendar();
	var newMonth ="";
	var newYear=0;
	if (displayedMonth == 0) {
	  //console.log("IF! 0");
	  newMonth = 11;
	  newYear = displayedYear - 1;
    	  displayedMonth = 11;
    	  displayedYear = displayedYear - 1;
	} else {
	  //console.log("ELSE!");
	  newMonth = displayedMonth - 1;
          displayedMonth = displayedMonth - 1;
          newYear = displayedYear;
	}
	// console.log("newMonth: " + newMonth);
	// console.log("newYear: " + newYear);
        //console.log("displayedMonth: " + displayedMonth);
        //console.log("displayedYear: " + displayedYear);
	printCalendar(newYear, newMonth);
}

function addEvent() {
  var firstDate = new Date(displayedYear, displayedMonth, 1);
  var firstDayValue = firstDate.getDay();
  cellInd = this.id;
  var newCellInd = cellInd.substr(1);
  var dateClicked = dateHolder[newCellInd - firstDayValue];

  //only display modal if the cell has a value
  if (dateClicked !== undefined) {
    $('.ui.modal').modal('show');
    document.getElementById("thisDate").innerHTML = (displayedMonth +1) + "/" + dateClicked + "/" + displayedYear;
  }
}

function resetForm() {
  $('.ui.form').form('clear');
}

function saveForm() {
  console.log("save");
  /*store user input*/
  var workoutValue = document.getElementById("workoutCategory").value;
  var descriptionValue = document.getElementById("description").value;
  var scoreValue = document.getElementById("score").value;
  /*add user input to array*/
  workoutHistory.push(workoutValue); 
  descHistory.push(descriptionValue);
  scoreHistory.push(scoreValue);
  /*show saved data on calendar*/
  var banner = document.createElement("span");
  var lineBreak = document.createElement("br");
  var i = document.createElement("i");
  banner.className="banner";
  i.className = "delete icon";
  i.style.cursor = "pointer";
  var content = document.createTextNode(workoutValue);
  var tooltip = "Description: " + descriptionValue + "\n\nScore: " + scoreValue;
  banner.setAttribute("data-tooltip", tooltip);
  banner.setAttribute("data-position", "right center");
  banner.appendChild(content);
  banner.appendChild(i);
  var currentCell = document.getElementById(cellInd);
  currentCell.appendChild(lineBreak);
  currentCell.appendChild(banner);
  console.log(document.getElementsByClassName("delete icon")[0]);
  //document.getElementsByClassName
  $(i).click( function (event){ 
    console.log("i click");
    event.stopPropagation();
    currentCell.removeChild(banner);
  })

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

  var next = document.getElementById("nextMonth");
  if(next.addEventListener){
    next.addEventListener("click", nextMonth, false);
  } else if (next.attachEvent){
	next.attachEvent("onclick", nextMonth);
  }

  var previous = document.getElementById("previousMonth");
  if(previous.addEventListener){
    previous.addEventListener("click", previousMonth, false);
  } else if (previous.attachEvent){
    previous.attachEvent("onclick", previousMonth);
  }

  var cellAdd = table.getElementsByTagName("td");
  for (var i=0; i<cellAdd.length; i++){
    if(cellAdd[i].addEventListener){
      cellAdd[i].addEventListener("click", addEvent, false);
    } else if (cellAdd[i].attachEvent){
  	  cellAdd[i].attachEvent("onclick", addEvent);
    }
  }

  var resetButton = document.getElementById("addEventReset");
  if(resetButton.addEventListener){
    resetButton.addEventListener("click", resetForm, false);
  } else if (resetButton.attachEvent){
    resetButton.attachEvent("onclick", false);
  }

  var saveButton = document.getElementById("addEventSave");
  if(saveButton.addEventListener){
    saveButton.addEventListener("click", saveForm, false);
  } else if (saveButton.attachEvent){
    saveButton.attachEvent("onclick", false);
  }
}

function pageSetup(){
  console.log("page loaded");
  printCalendar();
  createEventListeners();
}

/*runs after page loads; calls other functions*/
if (window.addEventListener) {
  window.addEventListener("load", pageSetup, false);
} else if(window.attachEvent) {
  window.attachEvent("onload", pageSetup);
}
