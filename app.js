// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBnHGGAUMWJhkstP7yEHFlqFVi4VI_QCiE",
    databaseURL: "https://my-project-jessica-ccfa2.firebaseio.com",
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim(); 
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var nextArrival= $("#next-arrival-input").val().trim();
    var minutesAway = $("#minutes-away-input").val().trim();
    var price = $("#price-input").val().trim();


  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      location: destination,
      train1: firstTrain,
      freq: frequency,
      nextArr: nextArrival,
      minAway: minutesAway,
      dollars: price 
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.location);
    console.log(newTrain.train1);
    console.log(newTrain.freq);
    console.log(newTrain.nextArr);
    console.log(newTrain.minutesAway);
    console.log(newTrain.dollars);
  
    alert("Train successfully added");
   
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
    $("#next-arrival-input").val("");
    $("#minutes-away-input").val("");
    $("#price-input").val("");
    });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
// Store everything into a variable.
      var  trainName = childSnapshot.val().name;
      var  destination = childSnapshot.val().location;
      var  firstTrain = childSnapshot.val().train1;
      var  frequency = childSnapshot.val().freq;
      var  nextArrival = childSnapshot.val().nextArr;
      var  minutesAway = childSnapshot.val().minAway;
      var  price = childSnapshot.val().price;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    console.log(nextArrival);
    console.log(minutesAway);
    console.log(price);


// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(destination),
  $("<td>").text(firstTrain),
  $("<td>").text(frequency),
  $("<td>").text(nextArrival),
  $("<td>").text(minutesAway)
  $("<td>").text(price)
);

// Append the new row to the table
$("#train-table > tbody").append(newRow);
});
  
