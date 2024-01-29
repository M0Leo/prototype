const CvArea = document.querySelector(".cv-area");
const dragText = document.querySelector(".dragdrop");
let button = document.querySelector(".browse");
let input = document.querySelector("input");
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
      let fileURL = fileReader.result;
      dragText.textContent = "";
      const filename = document.createElement("p");
      filename.textContent = file.name;
      CvArea.appendChild(filename);
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This File Not Pdf");
  }
}
