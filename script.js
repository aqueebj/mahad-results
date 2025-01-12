
let selectedSemester = '';
function setSemester(semester) {
    selectedSemester = semester;
    console.log(`Selected semester: ${selectedSemester}`);
    location.href = `result.html?semester=${selectedSemester}`;
}
