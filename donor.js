const form = document.querySelector('#donor-form');
const donationList = document.querySelector('#donation-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const donorId = document.querySelector('#donor-id').value;

  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify({"donor_id": donorId});

  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch('https://5ari1lmbsh.execute-api.us-east-1.amazonaws.com/dev/getmydonations', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Handle the response data here
        datastring = data.body.replace(/'/g, '"');
        // const donations = JSON.parse(datastring); 
        donationList.innerHTML = '';
        const donations = JSON.parse(datastring);
        // console.log(typeof(donation));
        donations.forEach(donation => {
            console.log(donation);
        const donationBox = document.createElement('div');
        donationBox.classList.add('donation-box');
        const foodName = document.createElement('h2');
        foodName.textContent = `Food Item: ${donation.food_name}`;
        const description = document.createElement('p');
        description.textContent = `Description: ${donation.description}`;
        const viableHours = document.createElement('p');
        viableHours.textContent = `Viable Hours: ${donation.viable_hours}`;
        const donationId = document.createElement('p');
        donationId.textContent = `Donation ID: ${donation.donation_id}`;
        donationBox.appendChild(foodName);
        donationBox.appendChild(description);
        donationBox.appendChild(viableHours);
        donationBox.appendChild(donationId);
        donationList.appendChild(donationBox);
      })
      .catch(error => {
        console.error('There was a problem with the API call:', error);
        // Handle the error here
      });


//   fetch(`API_ENDPOINT?donorId=${donorId}`)
//     .then(response => response.json())
//     .then(data => {
//       const donations = JSON.parse(data.body);
//       donationList.innerHTML = '';
//       donations.forEach(donation => {
//         const donationBox = document.createElement('div');
//         donationBox.classList.add('donation-box');
//         const foodName = document.createElement('h2');
//         foodName.textContent = donation.food_name;
//         const description = document.createElement('p');
//         description.textContent = donation.description;
//         const viableHours = document.createElement('p');
//         viableHours.textContent = `Viable Hours: ${donation.viable_hours}`;
//         const donationId = document.createElement('p');
//         donationId.textContent = `Donation ID: ${donation.donation_id}`;
//         donationBox.appendChild(foodName);
//         donationBox.appendChild(description);
//         donationBox.appendChild(viableHours);
//         donationBox.appendChild(donationId);
//         donationList.appendChild(donationBox);
//       });
    });
  form.reset();
});
