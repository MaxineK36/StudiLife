 console.log("5:14 version working");
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

firebase.auth().onAuthStateChanged(function(user) {
  if ((user)&&(test1===true)) {
    window.location.href = "index.html?new=1";
    setTimeout(100);
    console.log("someone is signed in")
    test1=false;
    
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

if($("#navbarRow").length > 0){
      $(document).ready(function(){
        var a = getQueryVariable("new");
        if (a=1){
          welcomeUser();
          console.log("a was 1")
        }
        else{
          console.log("a was not 1")
        }
      });
    }

// if($("#navbarRow").length > 0){
//     $(document).ready(function(){
//       welcomeUser();
//     });
// }

    // function clickLink(a) {
    //     var url1 = a.getAttribute('value');
    //     document.cookie = 'cookiename=' +url1+'; expires=Wed, 1 Jan 2070 13:47:11 UTC; path=/';
    // }
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


  var welcomeUser = function(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var user = firebase.auth().currentUser;
        console.log(firebase.auth().currentUser.displayName);
        console.log("opening modal")
        document.getElementById("welcomeBar").innerHTML = "Welcome, " + firebase.auth().currentUser.displayName;
        $('#welcomeModal').modal('show');
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
    

    
  
}


