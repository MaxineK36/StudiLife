//Note: functions are used in reverse order of the order they're listed in


var database = firebase.database();

//variables that will be used to collect form data;
var chosenGroupType;
var chosenGroupName;
var chosenTeacher;
var chosenYear;
var chosenBlock;
var chosenSemester;

//immediately runs the update page function to create a list of classes
updatePage();


//to clear all the data:
// firebase.database().ref("groups").set(null);
// firebase.database().ref("groupKeyArray").set(null)

function openCreateClassModal(){
	$('#createClassModal').modal('show');
	document.getElementById("courseName").value = null;
	document.getElementById("teacher").value= null;
	document.getElementById("year").value= null;
	document.getElementById("block").value= null;
	document.getElementById("semester").value= null;
}

function updatePage(){
	//collects all class data
	firebase.database().ref("classes").once('value').then(function(snapshot) {
	  console.log(snapshot.val());

	  //calculates size of data (how many objects)
	  size = Object.size(snapshot.val());

	  //if there are classes...
	  if (size != 0){
	  	//show the group list, instead of the "oh no"
	  	$("#groups").show()
		$("#noGroups").hide()

		//reset the list to null (so that when you add a class it redoes teh list instead of just adding to it)
		document.getElementById("groupList").innerHTML = null;

		//create a list of classes you're in
	  	for (var i=0; i<size; i++){
	  		// console.log("name: "+snapshot.val()[i].courseName)

	  		//adds list item
	  		var newListItem = document.createElement("li");  

	  		//sets it up as a link to the page for that class, names it the course name
	  		newListItem.innerHTML = "<a href='classpage.html?classID=" + i + "'> " + snapshot.val()[i].courseName +" </a>"

	  		//adds the item to the list
			document.getElementById("groupList").appendChild(newListItem);

	  	}
	  }
	  //if you're in no classes, show the "oh no! box"
	  else{
	  	 $("#groups").hide()
		$("#noGroups").show()
	  }
	});
}


//sets up the object constructor
function course(name, teacher, year, block, semester){
	this.courseName = name;
	this.teacher = teacher;
	this.year = year;
	this.block = block;
	this.semester = semester;
}

//function to calculate size of an object (# of items)
Object.size = function(obj){
		var size = 0, key;
		for (key in obj){
			if (obj.hasOwnProperty(key)) size++;}
		return size;
	}

//to add data to firebase
function updateData(number,course){
	console.log("object size: "+number)

	//creates a refkey based on the numerical id recieved
	var refKey = "classes/"+number

	//updates it using the object created previously, at the refKey
	firebase.database().ref(refKey).update(course);

	// //pushes the number to the classKeyArray so that it will increase next time
	// firebase.database().ref("classKeyArray").push(number);

	//hides the modal to create classes with, update class list
	$("#createClassModal").modal('hide');
	updatePage();

}

//read data to find out the size of the classKeyArray, set that size as "number," send that and the recieved course object to the next function
function readKeys(course){
	firebase.database().ref("classes").once('value').then(function(snapshot) {
	  console.log(snapshot.val());
	  var arraySize = Object.size(snapshot.val());
	  updateData(arraySize,course)
	});
}

function createClass(){
	//gathers form data
	chosenCourseName = document.getElementById("courseName").value;
	chosenTeacher = document.getElementById("teacher").value;
	chosenYear = document.getElementById("year").value;
	chosenBlock = document.getElementById("block").value;
	chosenSemester = document.getElementById("semester").value;

	//creates a new object with given information
	var tempCourse = new course(chosenCourseName,chosenTeacher,chosenYear,chosenBlock, chosenSemester);
	console.log(chosenCourseName + " name")
	console.log(chosenTeacher + " teacher")

	
	//sends that object to the next function
	readKeys(tempCourse)
}

var tempSize
firebase.database().ref("classes").once('value').then(function(snapshot) {
	  tempSize = Object.size(snapshot.val());
	console.log("size: "+tempSize)
	});

