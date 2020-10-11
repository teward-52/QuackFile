//Firebase configuration

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
    //Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    //Creating userFile reference var
    var userFile;

    //Storing single uploaded files into variable
    document.getElementById("files").addEventListener("change", function (e)
    {
        userFile = e.target.userFile;
    });

    //Click listener for upload button
    document.getElementById("upload").addEventListener("click", function()
    {
        //Check to make sure the user selected a file
        if(typeof userFile != "undefined")
        {
            //Creating storage reference
            var storageRef = firebase.storage().ref();

            //Creating file reference
            var fileRef = storageRef.child(userFile.name);

            //Upload status checker reference & call Firebase put to upload file
            var uploadStatus = storageRef.put(fileRef);
            //Indicate to client that file has been uploaded
            uploadStatus.then(function(snapshot)
            {
                console.log('Uploaded a file!');
                alert("File has been uploaded!");
            });

            //Update progress bar
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
                    ).innerHTML += `#(files[i].name} uploaded <br />)`;
                }
            )
            
        }
        else
        {
            alert("No file has been selected!");
        }
        
    });