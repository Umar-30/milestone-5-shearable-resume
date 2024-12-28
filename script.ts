// get references to the form and display area

const resumeForm = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const  shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadpdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

//Handle from submission
resumeForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); //prevent page reload

  //collect input values
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const mobileNo = (document.getElementById("mobileNo") as HTMLInputElement)
    .value;
  const education = (document.getElementById("education") as HTMLTextAreaElement)
    .value;
  const experiance = (document.getElementById("experiance") as HTMLTextAreaElement)
    .value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

  // Save form data in localStorage with the username as the key

  const resumeData ={
    name,
    email,
    mobileNo,
    education,
    experiance,
    skills
  };
  localStorage.setItem(username, JSON.stringify(resumeData));//saving the data locally


  //generate the resume content dynamically
  const resumeHTML = `
    <h2><b><center>Editable Resume</center></b></h2>
    <h3><u>Personal Information</u></h3><br>
    <p><b>Name: </b><span contenteditable="true"> ${name}</span></p><br>
    <p><b>Email: </b><span contenteditable="true"> ${email}</span></p><br>
    <p><b>mobileNo: </b><span contenteditable="true"> ${mobileNo}</span></p><br>

    <h3><u>Education</u></h3><br>
    <p contenteditable="true">${education}</p><br>

     <h3><u>Experiance</u></h3><br>
    <p contenteditable="true">${experiance}</p><br>

     <h3><u>Skills</u></h3><br>
    <p contenteditable="true">${skills}</p><br>
    `;

  // Display the generated resume
  resumeDisplayElement.innerHTML = resumeHTML;

  //Generate a shareable URL with the username only

  const shareableURL = `${window.location.origin}username=${encodeURIComponent(username)}`;

  // Display the shareable link
  shareableLinkContainer.style.display = 'block';
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;
  
});
//Handle PDF Download
downloadpdfButton.addEventListener('click', () => {
 window.print();//This event will open the print dialog and allow the user to save as PDF
});

//prefill the form based on the username in the URL 
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');

  if(username) {
    // Autofill form if data is found in localStorage

    const  savedResumeData = localStorage.getItem(username);

    if (savedResumeData) {
       const resumeData = JSON.parse(savedResumeData);
       (document.getElementById('username') as HTMLInputElement).value = username;
       (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
       (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
       (document.getElementById('mobileNo') as HTMLInputElement).value = resumeData.mobileNo;
       (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
       (document.getElementById('experiance') as HTMLTextAreaElement).value = resumeData.experiance;
       (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
    }
  }
});
