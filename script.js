const form = document.querySelector('#donation-form');
const successMessage = document.querySelector('#confirmation-msg');


// callAPI function that takes the base and exponent numbers as parameters
  var callAPI = (donation)=>{
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify({"donor_id":donation.donorId,"donation_id":donation.donationId, "food_name":donation.foodItemName, "description":donation.description, "viable_hours":donation.viableHours});

  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch('https://5ari1lmbsh.execute-api.us-east-1.amazonaws.com/dev', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Handle the response data here
      })
      .catch(error => {
        console.error('There was a problem with the API call:', error);
        // Handle the error here
      });
};

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const foodItemName = document.querySelector('#food-item-name').value;
  const description = document.querySelector('#description').value;
  const viableHours = parseInt(document.querySelector('#viable-hours').value, 10);
  const donorId = document.querySelector('#donor-id').value;
  const donationId = parseInt(document.querySelector('#donation-id').value, 10);
  
  const donation = {
    foodItemName,
    description,
    viableHours,
    donorId,
    donationId
  };
  
  // Store the donation details in JSON format in a variable called 'donation'
  console.log(donation);
  callAPI(donation);
  
  // Clear the form
  form.reset();
  
  // Display success message
  successMessage.style.display = 'block';
  setTimeout(function() {
    successMessage.style.display = 'none';
  }, 3000);
});


