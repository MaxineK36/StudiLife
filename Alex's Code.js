

//Step 1: Create object
//Step 2: Call readKeys(object)


//sets up the object constructor
function course(name, teacher, year, block, semester){
	//all the information i want to have 
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
function updateData(number,object){
	//creates a refkey based on the numerical id recieved (change the "classes" part, include the slash though)
	var refKey = "classes/"+number

	//updates it using the object created previously, at the refKey (this is where it adds your data to firebase)
	firebase.database().ref(refKey).update(object);

	//pushes the number to the classKeyArray (whatever you used in the readKeys function) so that it will increase next time
	firebase.database().ref("classKeyArray").push(number);

}

//read data to find out the size of the classKeyArray, set that size as "number," send that and the recieved course object to the next function
function readKeys(object){
	//my classKeyArray is my array of numbers (0,1,2, etc.)
	firebase.database().ref("classKeyArray-change this if you want").once('value').then(function(snapshot) {
		//uses the size function:
	  var keyArraySize = Object.size(snapshot.val());
	  updateData(keyArraySize,object)
	});
}




