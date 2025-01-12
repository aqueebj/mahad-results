// get the semester from the param
const urlParams = new URLSearchParams(window.location.search);
const semester = urlParams.get('semester');
console.log(`Selected semester: ${semester}`);
// handle null semester
if (semester === null) {
    alert("Please select a semester to view the result.");
    location.href = 'index.html';
}
// handle only 1st 2nd and 4th semester
if (semester !== '1st' && semester !== '2nd' && semester !== '4th') {
    alert("Please select a valid semester to view the result.");
    location.href = 'index.html';
}
// on load set the heading according to the semester
document.getElementById('semesterHeading').innerText = `Alimiyat ${semester} Semester Marksheet`;

let files = [];

// Load JSON file containing report card names
// fetch the files according to the semester if sem 1 then files_sem1.json
fetch(`files/files_${semester}.json`)
    .then(response => response.json())
    .then(data => {
        files = data.fileName || [];
        console.log("Files loaded");
    })
    .catch(error => {
        console.error("Error loading files:", error);
    });


function searchReport() {
    // Get input values
    const studentName = document.getElementById('studentName').value.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
    const fatherName = document.getElementById('fatherName').value.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
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
                    <a href="report_cards/${semester}/${fileName}" download>📥 Download ${fileName}</a>
                `;
    } else {
        // File not found, show an error
        resultDiv.innerHTML = `
                    <p class="error">⚠️ No result found. Please check your details and try again.</p>
                `;
    }
}