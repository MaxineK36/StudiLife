
var database = firebase.database();
	  var successCounter = 0;
	  var lastKey;


//to clear all firebase data for a certain refKey:
// firebase.database().ref("refKey").set(null);

//https://codelabs.developers.google.com/codelabs/cloud-firebase-chat/#4
//^for chat (live)

// window.setInterval(function() {
//   var elem = document.getElementById('chatBox');
//   elem.scrollTop = elem.scrollHeight;
// }, 5000);

var classID = getQueryVariable("classID")

var HWrefKey = "classHomework/" + classID;

$("#chatBox").scrollTop = $("#chatBox").scrollHeight;

function setupPage(){
	resetHomeworks();
	loadChats();
}

function resetHomeworks(){
	document.getElementById("homeworkTable").innerHTML = null;

	firebase.database().ref(HWrefKey).once('value').then(function(snapshot) {
	  console.log(snapshot.val());
	  // console.log("running")
	  var size = Object.size(snapshot.val());
	  var maxCount = size+1
	  console.log("size is: "+size)
	  var keepGoing = true;
	  var j=0;
	  successCounter=0;
	  for(var i=0; successCounter<size; i++){

	  	if (snapshot.val()[i]!=null){
		 	var dueDate = snapshot.val()[i].dueDate;
			console.log("due Date: " +dueDate);
			var assignmentTitle = snapshot.val()[i].assignmentTitle
			console.log("assignment title: " + assignmentTitle) 	
					var hwID = snapshot.val()[i].ID

			var newRow = document.createElement("tr");
			  	var dueDateData = document.createElement("td");
			  	var assignmentTitleData = document.createElement("td") 
			  	dueDateData.innerHTML = dueDate;
			  	$(dueDateData).addClass("dueDate");
			  	assignmentTitleData.innerHTML = assignmentTitle;
			  	newRow.appendChild(dueDateData); 
			  	newRow.appendChild(assignmentTitleData); 
			  	var newX = document.createElement("button")
			  	$(newX).addClass("glyphicon glyphicon-remove btn btn-default xButton "+hwID);
			  	$(newX).id="hw"+hwID;
			  	console.log(hwID)

			  	// var onclick = "deleteHW("+classID+"," + i + ")"
			  	
			  	$(newX).val(hwID);
			  	$(newX).on("click",	function(){ deleteHW(classID,$(this).val())})

			  	// 	function() { 
			  	// 	var tempRefKey = HWrefKey+"/"+$(this).val();
			  	// 	firebase.database().ref(tempRefKey).remove();
			  	// 	setupPage();

			  	// 	console.log("Your class ID is "+classID+" and your hwID is "+ $(this).val())
			  	// 	// alert("hi guys "+ $(this).val()) 
			  	// });
			  	// var tempRefKey = HWrefKey+"/"+$(this).val()
			  	// firebase.database().ref('users/ada').remove()

			  		// deleteHW(classID,$(this).val())) 

			  	
			  	//these two lines

				newRow.appendChild(newX);		  	// <span class="glyphicon glyphicon-remove"></span>
			  	document.getElementById("homeworkTable").appendChild(newRow);
			successCounter++
			if (successCounter==size){
				// alert("the end");
				lastKey=i;
				// alert("last key "+lastKey)
			}
		}	
	  }

	});
}

function deleteHW(classID,hwID){
	var goNow = false
	console.log("Your class ID is "+classID+" and your hwID is "+hwID)
	// $("#hwDeleteConfirm").modal("show")
	// setTimeout(1000)
	var doIt = confirm("Are you sure you want to delete?")
	// $( "input" ).on( "click", function() {
	//   $( "#log" ).html( $( "input:checked" ).val() + " is checked!" );
	// });
	// document.getElementById()
	var tempRefKey = HWrefKey+"/"+hwID;
	if (doIt == true) {
		firebase.database().ref(tempRefKey).remove();
		resetHomeworks();
	}
	else if (doIt == false) {
		// alert("it's not true")
	}
	
	
}

function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

firebase.database().ref("classes").once('value').then(function(snapshot) {
	  // console.log(snapshot.val());
	  document.getElementById("classImage").innerHTML = "<img src"
	  // console.log("teacher: "+snapshot.val()[classID].teacher)
	  document.getElementById("className").innerHTML = snapshot.val()[classID].courseName;
	  document.getElementById("classTeacher").innerHTML = snapshot.val()[classID].teacher;
	  document.getElementById("classBlock").innerHTML = "Block " + snapshot.val()[classID].block + " - ";
	  if (snapshot.val()[classID].semester=!"0"){
	  	document.getElementById("classSemester").innerHTML = "Semester " + snapshot.val()[classID].semester; + " - "
	  }
	  else if (snapshot.val()[classID].semester==0){

	  }
	  document.getElementById("classYear").innerHTML = snapshot.val()[classID].year;
	});
// console.log("class id: " + classID)

 
function addHomework(){
	$('#addHomework').modal('show');
	document.getElementById("dueDate").value = null;
	document.getElementById("assignmentTitle").value= null;
}


function homeworkAssignment(dueDate, assignmentTitle, include, ID){
	this.dueDate = dueDate;
	this.assignmentTitle = assignmentTitle;
	this.include = include;
	this.ID = ID;
}


//function to calculate size of an object (# of items)
Object.size = function(obj){
		var size = 0, key;
		for (key in obj){
			if (obj.hasOwnProperty(key)) size++;}
		return size;
	}

//to add data to firebase
function updateData(number,object){

	//creates a refkey based on the numerical id recieved
	var newRefKey = HWrefKey+"/"+number

	//updates it using the object created previously, at the refKey
	firebase.database().ref(newRefKey).set(object);
	console.log("added")
	resetHomeworks();

}



function createHomeworkAssignment(){
	var arraySize
	firebase.database().ref(HWrefKey).once('value').then(function(snapshot) {
		console.log("reading")
	  // console.log(snapshot.val());
	  arraySize = Object.size(snapshot.val());

	  if (isNaN(lastKey)==true){
	 		var newNumber = 0;
	 	}
	 else{
	 	var newNumber = lastKey+1
	 }
	  // updateData(arraySize,object)

		$('#addHomework').modal('hide');
		var chosenDueDate = document.getElementById("dueDate").value;
		var chosenAssignmentTitle = document.getElementById("assignmentTitle").value;
		var tempAssignment = new homeworkAssignment(chosenDueDate,chosenAssignmentTitle,1,newNumber);
		updateData(newNumber,tempAssignment)

		});

}

