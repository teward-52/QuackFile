              // Initialize the FirebaseUI Widget using Firebase.
              var ui = new firebaseui.auth.AuthUI(firebase.auth());
              
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

              //FirebaseUI Configuration
              var uiConfig = {
                callbacks: {
                  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                  },
                  uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                  }
                },
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInFlow: 'popup',
                signInSuccessUrl: '<url-to-redirect-to-on-success>',
                signInOptions: [
                  // Leave the lines as is for the providers you want to offer your users.
                  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                  //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                  //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                  //firebase.auth.GithubAuthProvider.PROVIDER_ID,
                  //firebase.auth.EmailAuthProvider.PROVIDER_ID,
                  //firebase.auth.PhoneAuthProvider.PROVIDER_ID
                ],
                // Terms of service url.
                tosUrl: '<your-tos-url>',
                // Privacy policy url.
                privacyPolicyUrl: '<your-privacy-policy-url>'
              };

              //Start Firebase UI Auth Interface
              // The start method will wait until the DOM is loaded.
              ui.start('#firebaseui-auth-container', uiConfig);