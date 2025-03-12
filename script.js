const sheetId = '1RPlTeCnvMs-Y9ZDR-6AtG2Vk2HY1cERs8dQB-_d5BrM';
const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
const ticker = document.getElementById('score-ticker');

function updateScores() {
  fetch(csvUrl)
    .then(response => response.text())
    .then(data => {
      // Split the CSV data into rows
      const rows = data.split('\n');
      if (rows.length > 0) {
        // Get the first row (header or data)
        const firstRow = rows[0];

        // Remove quotation marks and split into columns
        const columns = firstRow.replace(/"/g, '').split(',');

        // Create HTML for the first row with different colors for E to H
        const displayData = `
          <span>${columns[0]}</span> | 
          <span>${columns[1]}</span> | 
          <span>${columns[2]}</span> | 
          <span>${columns[3]}</span> | 
          <span class="col-e">${columns[4]}</span> | 
          <span class="col-f">${columns[5]}</span> | 
          <span class="col-g">${columns[6]}</span> | 
          <span class="col-h">${columns[7]}</span>
        `;

        // Update the ticker content smoothly
        ticker.innerHTML = `<p>${displayData}</p>`;
      } else {
        ticker.innerHTML = '<p>No data available.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      ticker.innerHTML = '<p>Failed to load scores.</p>';
    });
}

// Initial load
updateScores();

// Refresh every 5 seconds
setInterval(updateScores, 5000);
