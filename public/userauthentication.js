              // Initialize the FirebaseUI Widget using Firebase.
              var ui = new firebaseui.auth.AuthUI(firebase.auth());
              ui.start('#firebaseui-auth-container', {
              signInOptions: [
              
              // List of OAuth providers supported.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
              //firebase.auth.GithubAuthProvider.PROVIDER_ID
              ],
              // Other config options...
              });
              
              //Creating instance of Google provider object
              var provider = new firebase.auth.GoogleAuthProvider();

              //Redirect to sign-in page
              firebase.auth().signInWithRedirect(provider);

              //Retrieve OAuth token
              firebase.auth().getRedirectResult().then(function(result) {
                if (result.credential) {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  var token = result.credential.accessToken;
                  // ...
                }
                // The signed-in user info.
                var user = result.user;
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