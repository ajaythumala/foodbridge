// Make an API call to retrieve food donors' details
fetch('https://example.com/food-donors')
  .then(response => response.json())
  .then(data => {
    // Get the container element to display the details
    const container = document.querySelector('.container');
    
    // Loop through the data and create HTML for each donor's details
    data.forEach(donor => {
      const html = `
        <div class="donor">
          <h2 class="donor-name">${donor.food_name}</h2>
          <p class="donor-id">Donation ID: ${donor.donation_id}</p>
          <p class="donor-description">${donor.description}</p>
          <p class="donor-hours">Viable Hours: ${donor.viable_hours}</p>
        </div>
      `;
      // Add the HTML to the container element
      container.insertAdjacentHTML('beforeend', html);
    });
  })
  .catch(error => {
    // Display an error message if the API call fails
    console.log('Error:', error);
  });
