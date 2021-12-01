// get user data from API and return the json value.
const submitButton = document.querySelector(".submitButton");
const nameField = document.querySelector(".nameField");
const gender = document.querySelector(".gender");
const probability = document.querySelector(".probability");
const saveButton = document.querySelector(".saveButton");

async function getNameData(name) {
  console.log("request");
  console.log(name);

  try {
    let response = await fetch(`https://api.genderize.io/?name=${name}`);
    let json = await response.json();
    if (response.status == 200) {
      // console.log(json);
      // console.log(json.name);
      return json;
    }
    // handleError(json);
    return Promise.reject(`Request failed with error ${response.status}`);
  } catch (e) {
    showErrorMessage(e);
    console.log(e);
  }
}

function setPrediction(nameData) {
  gender.innerHTML = nameData.gender;
  probability.innerHTML = nameData.probability;
}

async function sendRequest(e) {
  console.log("clicked on submit");
  let name = nameField.value;
  if (name == "") {
    console.log("name was empty");
    return;
  }
  e.preventDefault();
  let nameData;
  nameData = await JSON.parse(window.localStorage.getItem(name));
  if (nameData == null) {
    nameData = await getNameData(name);
    console.log(nameData);
    if (nameData == null) return;
    // findPopLang(name);
    // window.localStorage.setItem(name, JSON.stringify(nameData));
  }
  // findPopLang(name);
  // fillProfileCard(nameData);
  setPrediction(nameData);
}

function saveInformation(e) {
  console.log("save button clicked!");
  let name = nameField.value;
  const genderRadio = document.querySelector(
    'input[name="genderChoice"]:checked'
  ).value;
  if (name == "" || !genderRadio) {
    console.log("empty field detected");
    return;
  }
  e.preventDefault();
  window.localStorage.setItem(name, genderRadio);
}

submitButton.addEventListener("click", sendRequest);
saveButton.addEventListener("click", saveInformation);