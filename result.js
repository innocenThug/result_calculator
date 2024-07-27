// Modal
var modal = document.getElementById("resultModal");
var closeBtn = document.getElementsByClassName("close")[0];

// Generate Button
var generateBtn = document.getElementById("generateBtn");
generateBtn.addEventListener("click", calculateResult);

// Calculate Result
function calculateResult() {
  var studentName = document.getElementById("studentName").value;
  var manualMarks = parseFloat(document.getElementById("manualMarks").value);
  var javaMarks = parseFloat(document.getElementById("javaMarks").value);
  var webTechMarks = parseFloat(document.getElementById("webTechMarks").value);
  var sqlMarks = parseFloat(document.getElementById("sqlMarks").value);

  var invalidSubjects = [];
  if (!validateMarks(manualMarks)) {
    invalidSubjects.push("Advance java");
  }
  if (!validateMarks(javaMarks)) {
    invalidSubjects.push("Java");
  }
  if (!validateMarks(webTechMarks)) {
    invalidSubjects.push("Web Technology");
  }
  if (!validateMarks(sqlMarks)) {
    invalidSubjects.push("SQL");
  }
  if (invalidSubjects.length > 0) {
    var message = "Invalid marks! The following subject(s) have invalid marks: " + invalidSubjects.join(", ");
    displayModal(message, invalidSubjects);
    return;
  }

  var failedSubjects = [];
  if (manualMarks < 35) {
    failedSubjects.push("Advance java");
  }
  if (javaMarks < 35) {
    failedSubjects.push("Java");
  }
  if (webTechMarks < 35) {
    failedSubjects.push("Web Technology");
  }
  if (sqlMarks < 35) {
    failedSubjects.push("SQL");
  }

  if (failedSubjects.length > 0) {
    var message = "Failed....You have failed in the following subject(s): " + failedSubjects.join(", ");
    // message.style.color='red';
    displayModal(message, failedSubjects);
    displayFailedSubjects(failedSubjects);
  } else {
    var totalMarks = manualMarks + javaMarks + webTechMarks + sqlMarks;
    var percentage = (totalMarks / 400) * 100;
    var grade = getGrade(percentage);
    var message = "Congratulations, " + studentName + "! You have passed.";
    displayModal(message);
    displayResult(studentName, totalMarks, percentage, grade);
  }
}

// Validate Marks
function validateMarks(marks) {
  return marks >= 0 && marks <= 100;
}

// Get Grade based on Percentage
function getGrade(percentage) {
  if (percentage >= 85) {
    return "Distinction";
  } else if (percentage >= 60) {
    return "First Class";
  } else if (percentage >= 50) {
    return "Second Class";
  } else {
    return "Third Class";
  }
}

// Display Modal
function displayModal(message, subjects) {
  var modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;

  if (subjects && subjects.length > 0) {
    var subjectList = document.getElementById("subjectList");
    subjectList.innerHTML = subjects.map((subject) => `<li>${subject}</li>`).join("");
    subjectList.style.display = "block";
  }

  modal.style.display = "block";
  setTimeout(function () {
    modal.style.display = "none";
    if (subjects && subjects.length > 0) {
      document.getElementById("subjectList").style.display = "none";
    }
  }, 3000);
}
// Display Failed Subjects on Screen
function displayFailedSubjects(failedSubjects) {
    var resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `
      <h2>Result</h2>
      <p class="failed-message">Failed... You have failed in the following subject:</p>
      <ul>
        ${failedSubjects.map((subject) => `<li>${subject}</li>`).join("")}
      </ul>
    `;
  }
  
  

// Display Result on Screen
function displayResult(studentName, totalMarks, percentage, grade) {
  var resultContainer = document.getElementById("result");
  resultContainer.innerHTML = `
    <h2 style="text-align: center; color: goldenrod">Result</h2>
    <p>Congratulations, ${studentName} You have successfully passed.</p>
    <p>Total Marks: ${totalMarks}</p>
    <p>Percentage: ${percentage.toFixed(2)}%</p>
    <p>Grade: <span class="grade-${grade.toLowerCase()}">${grade}</span></p>
  `;
}

// Close Modal
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });