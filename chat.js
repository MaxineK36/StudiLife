var database = firebase.database();
var classID = getQueryVariable("classID")

var chatRefKey = "chats/" +"classes/" + classID;

console.log("chat 9:53")

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


function updateChatData(number,object){

	//creates a refkey based on the numerical id recieved
	var newRefKey = chatRefKey+"/"+number

	//updates it using the object created previously, at the refKey
	firebase.database().ref(newRefKey).set(object);
	// console.log("added")
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
		var user = firebase.auth().currentUser;
		var authortemp = (firebase.auth().currentUser.displayName);
		console.log(authortemp)
	 	arraySize = Object.size(snapshot.val());
		var thisChatText = document.getElementById("chatInput").value;
		var thisChatAuthor = authortemp
		var tempChat = new chatMoment(thisChatText,thisChatAuthor) 
		// alert("hey")
		// console.log(tempChat)
		updateChatData(arraySize,tempChat)
		var newLine = document.createElement("p")
		newLine.innerHTML="<span style='font-weight: bold'>"+thisChatAuthor+": </span>"+thisChatText
		document.getElementById("chatBox").appendChild(newLine)
		var elem = document.getElementById('chatBox');
	  	elem.scrollTop = elem.scrollHeight;
	  	console.log("test")
	})

}

var starCountRef = firebase.database().ref(chatRefKey);
starCountRef.on('value', function(snapshot) {
  loadChats();
});

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
		// console.log("author: " +author);
		var text = snapshot.val()[i].chatText
		// console.log("chat text: " + text) 	
		var newLine = document.createElement("p")
		newLine.innerHTML="<span style='font-weight: bold'>"+author+": </span>"+text
		document.getElementById("chatBox").appendChild(newLine)

	  }
	  var elem = document.getElementById('chatBox');
	elem.scrollTop = elem.scrollHeight;
	// alert('hey')
	 })

}
