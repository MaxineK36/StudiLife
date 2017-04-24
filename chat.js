var database = firebase.database();
var classID = getQueryVariable("classID")

var chatRefKey = "chats/" +"classes/" + classID;

// var element = document.getElementById("chatBox");
// element.scrollTop = element.scrollHeight;

// $('#chatBox').scrollTop($('#chatBox')[0].scrollHeight);


$("#chatInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#chatSubmit").click();
    }
});

function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


Object.size = function(obj){
		var size = 0, key;
		for (key in obj){
			if (obj.hasOwnProperty(key)) size++;}
		return size;
	}

function chatMoment(chatText,chatAuthor){
	this.chatText = chatText;
	this.chatAuthor = chatAuthor;
	// this.assignmentTitle = assignmentTitle;
}


function updateData(number,object){

	//creates a refkey based on the numerical id recieved
	var newRefKey = chatRefKey+"/"+number

	//updates it using the object created previously, at the refKey
	firebase.database().ref(newRefKey).set(object);
	console.log("added")
	document.getElementById("chatInput").value = null;
	// loadChats();

}


function addChatMoment(){
	// alert('adding')
	// var author = firebase.auth().currentUser.displayName
	// alert(author)
	
//insert key here
	var arraySize
	firebase.database().ref(chatRefKey).once('value').then(function(snapshot) {
	 	arraySize = Object.size(snapshot.val());
		var thisChatText = document.getElementById("chatInput").value;
		var thisChatAuthor = "me"
		var tempChat = new chatMoment(thisChatText,thisChatAuthor) 
		// alert("hey")
		// console.log(tempChat)
		updateData(arraySize,tempChat)
		var newLine = document.createElement("p")
		newLine.innerHTML="<span style='font-weight: bold'>"+thisChatAuthor+": </span>"+thisChatText
		document.getElementById("chatBox").appendChild(newLine)
		var elem = document.getElementById('chatBox');
	  	elem.scrollTop = elem.scrollHeight;
	  	console.log("test")
	})

}

function loadChats(){

	// var elem = document.getElementById('chatBox');
 //  	elem.scrollTop = elem.scrollHeight;
  	console.log("test")
	document.getElementById("chatBox").innerHTML = null;
	firebase.database().ref(chatRefKey).once('value').then(function(snapshot) {
	  console.log(snapshot.val());
	  var size = Object.size(snapshot.val());
	  for (var i=0; i<size; i++){
	  	var author = snapshot.val()[i].chatAuthor;
		console.log("author: " +author);
		var text = snapshot.val()[i].chatText
		console.log("chat text: " + text) 	
		var newLine = document.createElement("p")
		newLine.innerHTML="<span style='font-weight: bold'>"+author+": </span>"+text
		document.getElementById("chatBox").appendChild(newLine)

	  }
	  var elem = document.getElementById('chatBox');
	elem.scrollTop = elem.scrollHeight;
	// alert('hey')
	 })

}


// function resetHomeworks(){
// 	document.getElementById("homeworkTable").innerHTML = null;

// 	firebase.database().ref(HWrefKey).once('value').then(function(snapshot) {
// 	  console.log(snapshot.val());
// 	  // console.log("running")
// 	  var size = Object.size(snapshot.val());
// 	  var maxCount = size+1
// 	  console.log("size is: "+size)
// 	  var keepGoing = true;
// 	  var j=0;
// 	  successCounter=0;
// 	  for(var i=0; successCounter<size; i++){

// 	  	if (snapshot.val()[i]!=null){
// 		 	var dueDate = snapshot.val()[i].dueDate;
// 			console.log("due Date: " +dueDate);
// 			var assignmentTitle = snapshot.val()[i].assignmentTitle
// 			console.log("assignment title: " + assignmentTitle) 	
// 					var hwID = snapshot.val()[i].ID

// 			var newRow = document.createElement("tr");
// 			  	var dueDateData = document.createElement("td");
// 			  	var assignmentTitleData = document.createElement("td") 
// 			  	dueDateData.innerHTML = dueDate;
// 			  	$(dueDateData).addClass("dueDate");
// 			  	assignmentTitleData.innerHTML = assignmentTitle;
// 			  	newRow.appendChild(dueDateData); 
// 			  	newRow.appendChild(assignmentTitleData); 
// 			  	var newX = document.createElement("button")
// 			  	$(newX).addClass("glyphicon glyphicon-remove btn btn-default xButton "+hwID);
// 			  	$(newX).id="hw"+hwID;
// 			  	console.log(hwID)

// 			  	// var onclick = "deleteHW("+classID+"," + i + ")"
			  	
// 			  	$(newX).val(hwID);
// 			  	$(newX).on("click",	function(){ deleteHW(classID,$(this).val())})
// 				newRow.appendChild(newX);		  	// <span class="glyphicon glyphicon-remove"></span>
// 			  	document.getElementById("homeworkTable").appendChild(newRow);
// 			successCounter++
// 			if (successCounter==size){
// 				// alert("the end");
// 				lastKey=i;
// 				// alert("last key "+lastKey)
// 			}
// 		}	
// 	  }

// 	});
// }


