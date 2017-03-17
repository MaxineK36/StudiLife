 console.log("10:18 version working");
  $("#welcomeDiv").hide();
  $("#loginDiv").show();

  var openModalyN 
  var test1 = false;

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3djWUB8OEdYHsMxCOp2iTjKKrtheswDA",
    authDomain: "studilife-7a2fc.firebaseapp.com",
    databaseURL: "https://studilife-7a2fc.firebaseio.com",
    storageBucket: "studilife-7a2fc.appspot.com",
    messagingSenderId: "910045511452"
  };

  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');

var signIn = function(){ 
  test1=true;
  console.log("signing in")
      firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
    
    
  }
var user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function(user) {
  if ((user)&&(test1===true)) {
    window.location.href = "index.html";
    setTimeout(100);
    welcomeUser();
    console.log("someone is signed in")
    alert("HEYYY")
    // User is signed in.
  } else {
    // No user is signed in.
  }
});


  var welcomeUser = function(){
    var name, email, photoUrl, uid, emailVerified;
    console.log("starting to welcome user")
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                      // you have one. Use User.getToken() instead.
    }
      console.log("opening modal")
      document.getElementById("welcomeBar").innerHTML = "Welcome, " + name;
      $('#welcomeModal').modal('show');
      break;

    

}


