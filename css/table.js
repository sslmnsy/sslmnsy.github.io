function createTable(data) {
    let table = '<table>';
    table += '<thead><tr><th>No</th><th>Judul</th><th>Kategori</th><th>Waktu Rilis</th><th>Waktu Scraping</th></tr></thead>';
    table += '<tbody>';
    let i = 0;
    data.forEach(item => {
      table += '<tr>';
      table += '<td>' + ++i + '</td>';
      table += '<td>' + '<a href=' + item['Link Berita'] + '>' + item.Judul + '</a>' + '</td>';
      table += '<td>' + item.Kategori + '</td>';
      table += '<td>' + item['Waktu Rilis'] + '</td>';
      table += '<td>' + item['Waktu Scraping'] + '</td>';
      table += '</tr>';
    });
    table += '</tbody></table>';
    return table;
  }
  
  $(document).ready(function() {
    $.getJSON('news_data.json', function(data) {
      console.log(data);
      const table = createTable(data);
      $('#table-container').append(table);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + textStatus + ' - ' + errorThrown);
    });
  });
  
  const repoOwner = 'sslmnsy';
  const repoName = 'sslmnsy.github.io';
  const workflowFileName = 'update_data.yml';
  
  const button = document.getElementById('run-workflow-button');
  button.addEventListener('click', runWorkflow);
  
  async function runWorkflow() {
    try {
      const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/${workflowFileName}/dispatches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${githubToken}`
        },
        body: JSON.stringify({})
      });
  
      if (response.ok) {
        console.log('Workflow triggered successfully!');
      } else {
        console.error('Failed to trigger workflow:', response.status);
      }
    } catch (error) {
      console.error('Error triggering workflow:', error);
    }
  }