const submitButton = document.querySelector("#submitButton");
const nameField = document.querySelector(".nameField");
const gender = document.querySelector("#gender");
const probability = document.querySelector("#probability");
const saveButton = document.querySelector("#saveButton");
const saved_gender = document.querySelector("#saved_gender");
const clearButton = document.querySelector("#clearButton");

async function getNameData(name) {
  console.log("sending request to API");
  console.log(name);

  try {
    let response = await fetch(`https://api.genderize.io/?name=${name}`);
    let json = await response.json();
    if (response.status == 200) {
      if (json.gender == null) {
        showAlert("Name Gender not found");
        return;
      }
      return JSON.parse(JSON.stringify(json));
    }
    return Promise.reject(`Request failed with error ${response.status}`);
  } catch (e) {
    showAlert("An Error occured!");
    console.log(e);
  }
}

function showAlert(message) {
  var warning = document.createElement("div");
  warning.setAttribute(
    "style",
    "position:absolute;top:10%;left:8%;padding: 20px;margin-right:20px;background-color: #f44336;color: white;"
  );
  warning.innerHTML = message;
  setTimeout(function () {
    warning.parentNode.removeChild(warning);
  }, 5000);
  document.body.appendChild(warning);
}

function setPrediction(nameData) {
  gender.innerHTML = nameData.gender;
  probability.innerHTML = nameData.probability;
}

async function sendRequestToAPI(e) {
  hideSavedAnsweContainer();
  console.log("submitted");
  let name = nameField.value;

  if (name == "") {
    console.log("name field is empty");
    return;
  }
  e.preventDefault();

  let nameData;
  nameData = await getNameData(name);
  console.log(nameData);
  if (nameData == null) return;

  setPrediction(nameData);
  showSavedAnswerContainer(name);
}

function saveInformation(e) {
  console.log("save button clicked!");
  let name = nameField.value;
  let genderRadio = null;
  e.preventDefault();
  if (
    document.getElementById("maleRadio").checked ||
    document.getElementById("femaleRadio").checked
  ) {
    genderRadio = document.querySelector(
      'input[name="genderChoice"]:checked'
    ).value;
  }

  if (name == "") {
    console.log("name field is empty");
    return;
  }

  if (genderRadio) {
    window.localStorage.setItem(name, genderRadio);
  } else {
    console.log("saving prediction");
    window.localStorage.setItem(name, gender.innerHTML);
  }

  console.log("done!");
  showSavedAnswerContainer(name);
}

function showSavedAnswerContainer(name) {
  var storage = localStorage.getItem(name);
  if (storage) {
    saved_gender.innerHTML = localStorage.getItem(name);
    document.getElementById("saved_answer_container").style.display = "block";
  }
}

function hideSavedAnsweContainer() {
  document.getElementById("saved_answer_container").style.display = "none";
}

function clearSavedAnswer(e) {
  e.preventDefault();
  document.getElementById("saved_answer_container").style.display = "none";
  localStorage.removeItem(nameField.value);
}

const $input = nameField;
const ALLOWED_CHARS_REGEXP = /^[a-zA-Z ]*$/;
$input.addEventListener("beforeinput", (e) => {
  if (!ALLOWED_CHARS_REGEXP.test(e.data)) {
    e.preventDefault();
  }
});

submitButton.addEventListener("click", sendRequestToAPI);
saveButton.addEventListener("click", saveInformation);
clearButton.addEventListener("click", clearSavedAnswer);
