let files = [];

// Load JSON file containing report card names
fetch('files.json')
    .then(response => response.json())
    .then(data => {
        files = data.fileName;
        console.log("Files loaded:", files);
    })
    .catch(error => {
        console.error("Error loading files:", error);
    });

function searchReport() {
    // Get input values
    const studentName = document.getElementById('studentName').value.trim().replace(/ /g, '_').toUpperCase();
    const fatherName = document.getElementById('fatherName').value.trim().replace(/ /g, '_').toUpperCase();
    // Check if the input fields are empty
    if (studentName === "" || fatherName === "") {
        alert("Please enter both student name and father name to search for the score card.");
        return;
    }
    // Generate the expected file name
    const fileName = `${studentName}_${fatherName}.pdf`;

    // Check if the file exists in the list
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ""; // Clear previous messages

    if (files.includes(fileName)) {
        // File found, provide download link
        resultDiv.innerHTML = `
                    <p class="success">🎉 Result found! Click below to download:</p>
                    <a href="report_cards/${fileName}" download>📥 Download ${fileName}</a>
                `;
    } else {
        // File not found, show an error
        resultDiv.innerHTML = `
                    <p class="error">⚠️ No result found.${fileName} Please check your details and try again.</p>
                `;
    }
}
