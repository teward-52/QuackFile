            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            var firebaseConfig = {
                apiKey: "AIzaSyAcHoj4SzNJo9-ldyLMRA9HfFoVhWG6loA",
                authDomain: "quackfile.firebaseapp.com",
                databaseURL: "https://quackfile.firebaseio.com",
                projectId: "quackfile",
                storageBucket: "quackfile.appspot.com",
                messagingSenderId: "140319055728",
                appId: "1:140319055728:web:c5606d9035e4f07e2af9b5",
                measurementId: "G-HL35W51LBF"
                };
                // Initialize Firebase
                firebase.initializeApp(firebaseConfig);
                firebase.analytics();
                
                // Storing uploaded files into array
                var files = [];
                document.getElementById("files").addEventListener("change", function (e)
                {
                    files = e.target.files;
                });

                // Creating click listener for upload button
                document.getElementById("upload").addEventListener("click", function() {
                    



                    // Makes sure that there is a selected file
                    if (files.length != 0)
                    {
                        // Loop through through selected files
                        for (let i = 0; i < files.length; i++)
                        {
                            // Creating storage reference
                            var storageRef = firebase.storage().ref();
                            
                            // Creating file reference
                            var fileRef = storageRef.child(files[i].name);
                            
                            // Upload file to FireBase via previously created file reference
                            var upload = storage.put(fileRef);
                            //TODO: blob or file api reference?
                            storageRef.put(fileRef).then(function(snapshot) {
                                console.log('Uploaded a file!');
                                alert("File has been uploaded!");
                            });

                            // Update progress bar
                            upload.on(
                                "state_changed",
                                function progress(snapshot)
                                {
                                    var percentage = 
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    document.getElementById("progress").value = percentage;
                                },
                                function error()
                                {
                                    alert("error uploading file");
                                },
                                function complete()
                                {
                                    document.getElementById(
                                        "uploading"
                                    ).innerHTML += `#{files[i].name} upoaded <br />`;
                                }
                            );
                        }
                    }
                    else
                    {
                        alert("No file has been selected");
                    }
                });