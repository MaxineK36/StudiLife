// $("#createGroupModal").hide();
var database = firebase.database();

$("#groups").hide()
		$("#noGroups").hide()

updatePage();

//to clear all the data:
// firebase.database().ref("groups").set(null);
// firebase.database().ref("groupKeyArray").set(null)

function updatePage(){
	//collects all class data
	firebase.database().ref("groups").once('value').then(function(snapshot) {
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

	  		//adds list item
	  		var newListItem = document.createElement("li");  

	  		//sets it up as a link to the page for that class, names it the course name
	  		newListItem.innerHTML = "<a href='classpage.html?groupID=" + i + "'> " + snapshot.val()[i].projectName +" </a>"

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

function openCreateGroupModal(){
	$('#createGroupModal').modal('show');
	document.getElementById("projectName").value = null;
	document.getElementById("date").value= null;
	document.getElementById("groupMembers").value= null;
	document.getElementById("course").value= null;
}

function group(name, date, groupMembers, course){
	this.projectName = name;
	this.date = date;
	this.groupMembers = groupMembers;
	this.course = course;
}

Object.size = function(obj){
		var size = 0, key;
		for (key in obj){
			if (obj.hasOwnProperty(key)) size++;}
		return size;
	}

function updateData(number,group){
	console.log("object size: "+number)

	var refKey = "groups/"+number

	firebase.database().ref(refKey).update(group);
	// firebase.database().ref("groupKeyArray").push(number);
	$("#createGroupModal").modal('hide');


}

function readKeys(course){
	firebase.database().ref("groups").once('value').then(function(snapshot) {
	  console.log(snapshot.val());
	  var arraySize = Object.size(snapshot.val());
	  // var refKey = "classes/"+keyArraySize
	  // runAgain = false
	  updateData(arraySize,course)
	});
}

function createGroup(){
	var chosenProjectName = document.getElementById("projectName").value;
	var chosenDate = document.getElementById("date").value;
	var chosenGroupMembers = document.getElementById("groupMembers").value;
	var chosenCourse = document.getElementById("course").value;


	var tempGroup = new group(chosenProjectName,chosenDate,chosenGroupMembers,chosenCourse);
	// console.log(chosenCourseName + " name")
	// console.log(chosenTeacher + " teacher")
	// console.log("object now: "+tempCourse.courseName+tempCourse.teacher+tempCourse.year+tempCourse.block+tempCourse.semester);

	
	// var keyArraySize

	readKeys(tempGroup)
}


