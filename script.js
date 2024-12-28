// get references to the form and display area
var resumeForm = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadpdfButton = document.getElementById('download-pdf');
//Handle from submission
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault(); //prevent page reload
    //collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mobileNo = document.getElementById("mobileNo")
        .value;
    var education = document.getElementById("education")
        .value;
    var experiance = document.getElementById("experiance")
        .value;
    var skills = document.getElementById("skills").value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        mobileNo: mobileNo,
        education: education,
        experiance: experiance,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally
    //generate the resume content dynamically
    var resumeHTML = "\n    <h2><b><center>Editable Resume</center></b></h2>\n    <h3><u>Personal Information</u></h3><br>\n    <p><b>Name: </b><span contenteditable=\"true\"> ".concat(name, "</span></p><br>\n    <p><b>Email: </b><span contenteditable=\"true\"> ").concat(email, "</span></p><br>\n    <p><b>mobileNo: </b><span contenteditable=\"true\"> ").concat(mobileNo, "</span></p><br>\n\n    <h3><u>Education</u></h3><br>\n    <p contenteditable=\"true\">").concat(education, "</p><br>\n\n     <h3><u>Experiance</u></h3><br>\n    <p contenteditable=\"true\">").concat(experiance, "</p><br>\n\n     <h3><u>Skills</u></h3><br>\n    <p contenteditable=\"true\">").concat(skills, "</p><br>\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    //Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
//Handle PDF Download
downloadpdfButton.addEventListener('click', function () {
    window.print(); //This event will open the print dialog and allow the user to save as PDF
});
//prefill the form based on the username in the URL 
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('mobileNo').value = resumeData.mobileNo;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experiance').value = resumeData.experiance;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
