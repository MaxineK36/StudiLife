// $("#createGroupModal").hide();
var a = 0;
var database = firebase.database();
var chosenCode;
var chosenName;
var chosenType;

var name;

var runAgain = true;

//to clear all the data:
// firebase.database().ref("groups").set(null);
// firebase.database().ref("groupKeyArray").set(null)


function group(id, name, type){
	this.courseID = id;
	this.courseName = name;
	this.category = type;
	
}

function group(name, type){
	this.category = type;
	this.courseName = name;
	
}

Object.size = function(obj){
		var size = 0, key;
		for (key in obj){
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	}

function updateData(number,group){
	console.log("found it")
	console.log("object size again: "+number)

	var refKey = "groups/"+number

	firebase.database().ref(refKey).update(group);
	firebase.database().ref("groupKeyArray").push(number);

}

function readKeys(group){
	firebase.database().ref("groupKeyArray").once('value').then(function(snapshot) {
	  console.log(snapshot.val());
	  	keyArraySize = Object.size(snapshot.val());
	  	console.log("object size: "+keyArraySize)
	  	var refKey = "groups/"+keyArraySize
	  	runAgain = false
	  	updateData(keyArraySize,group)
	  	a = 1;
	  	console.log("a is "+a)
	  // ...
	});
}

function createGroup(){
	$('#createGroupModal').modal('show');
	chosenCode;
	chosenName = document.getElementById("groupName").value;
	chosenType = document.getElementById("groupType").value;
	//type 1: class
	//type 2: project group

	console.log("code: "+chosenCode)
	console.log("name: "+chosenName)
	console.log("type: "+chosenType)

	var tempGroup = new group(chosenCode,chosenName,chosenType);
	console.log("object now: "+tempGroup.courseID+tempGroup.courseName+tempGroup.category)

	
	var keyArraySize

	readKeys(tempGroup)
}

var Q1 = document.getElementById("groupName").value;
	var Q2 = Number(document.getElementById("Q2grade").value);
	var Q3 = Number(document.getElementById("Q3grade").value);
	var Q4 = Number(document.getElementById("Q4grade").value);
	var MT = Number(document.getElementById("midtermgrade").value);
	var letterGoal = document.getElementById("letterGoal").value;


