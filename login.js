 console.log("9:55 version working");
  $("#welcomeDiv").hide();
  $("#loginDiv").show();

  var openModal;

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
    welcomeUser();
    openModal = true;
  }


  var welcomeUser = function(openModal){
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                      // you have one. Use User.getToken() instead.
    }
    if (openModal===true){
      $('#welcomeModal').modal('show');
      openModal=false;
    }


   

    document.getElementById("welcomeBar").innerHTML = "Welcome, " + name;

}


