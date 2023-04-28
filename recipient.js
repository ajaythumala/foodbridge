// Make an API call to retrieve food donors' details
fetch('https://5ari1lmbsh.execute-api.us-east-1.amazonaws.com/dev', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
    console.log(data.body); // logs the response data from the API
    // donations = JSON.parse(data.body);
    // Get the container element to display the details
    donations = data.body;
    const container = document.querySelector('table');

    // Loop through the data and create HTML for each donor's details
    donations.forEach(donor => {
    const html = `
        <div class="donor">
        <td class="donor-name">${donor.food_name}</h2>
        <td class="donor-id">Donation ID: ${donor.donation_id}</p>
        <td class="donor-description">${donor.description}</p>
        <td class="donor-hours">Viable Hours: ${donor.viable_hours}</p>
        </div>
    `;
    // Add the HTML to the container element
    container.insertAdjacentHTML('beforeend', html);
    });
})
.catch(error => {
  console.error('Error:', error);
});


