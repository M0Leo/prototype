const CvArea = document.querySelector(".cv-area");
const dragText = document.querySelector(".dragdrop");
let button = document.querySelector(".browse");
let input = document.querySelector("input");
const upload = document.querySelector(".UploadButton");
let file;

button.onclick = () => {
  input.click();
};

input.addEventListener("change", function () {
  file = this.files[0];
  CvArea.classList.add("active");
  displayFile();
});

CvArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dragText.textContent = "Release to Upload";
  CvArea.classList.add("active");
});

CvArea.addEventListener("dragleave", () => {
  dragText.textContent = "Drag & Drop";
  CvArea.classList.remove("active");
});

CvArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  displayFile();
});

function displayFile() {
  let fileType = file.type;

  let validExtensions = ["application/pdf"];

  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      dragText.textContent = "";
      const filename = document.createElement("p");
      filename.textContent = file.name;

      const existingFilename = CvArea.querySelector("p");
      if (existingFilename) {
        CvArea.removeChild(existingFilename);
      }

      CvArea.appendChild(filename);
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This File is not a PDF");
  }
}

upload.addEventListener("click", function (event) {
  if (!file) {
    event.preventDefault();
    const error = document.createElement("p");
    error.textContent = "Please upload a file";
    error.classList.add("error-message");
    const existingError = CvArea.querySelector(".error-message");
    if (existingError) {
      CvArea.removeChild(existingError);
    }
    CvArea.appendChild(error);
  }
});
