const sheetId = '1RPlTeCnvMs-Y9ZDR-6AtG2Vk2HY1cERs8dQB-_d5BrM';
const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
const ticker = document.getElementById('score-ticker');

function updateScores() {
  fetch(csvUrl)
    .then(response => response.text())
    .then(data => {
      // Split the CSV data into rows
      const rows = data.split('\n');
      if (rows.length >= 2) { // Ensure there are at least 2 rows
        let html = '';

        // Process the first two rows
        for (let i = 0; i < 2; i++) {
          const row = rows[i];
          const columns = row.replace(/"/g, '').split(',');

          // Format columns A-D (left-aligned, blue)
          const leftContent = `
            <span class="left">
              ${columns[0]} / ${columns[1]} / ${columns[2]} overs ${columns[3]}
            </span>
          `;

          // Format columns E-H (right-aligned, black)
          const rightContent = `
            <span class="right">
              ${columns[4]} / ${columns[5]} overs ${columns[6]}
            </span>
          `;

          // Combine left and right content
          html += `<p>${leftContent}${rightContent}</p>`;
        }

        // Update the ticker content
        ticker.innerHTML = html;
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
