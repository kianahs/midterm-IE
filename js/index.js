// get user data from API and return the json value.
const submitButton = document.querySelector(".submitButton");
const nameField = document.querySelector(".nameField");
const gender = document.querySelector(".gender");
const probability = document.querySelector(".probability");
const saveButton = document.querySelector(".saveButton");
const saved_answer_topic = document.querySelector("#saved_answer_topic");
const saved_gender = document.querySelector("#saved_gender");
const clearButton = document.querySelector("#clearButton");

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
    console.log("name empty");
    return;
  }
  if (genderRadio) {
    window.localStorage.setItem(name, genderRadio);
  } else {
    console.log("saving prediction");

    window.localStorage.setItem(name, gender.innerHTML);
  }
  console.log("done!");

  saved_answer_topic.innerHTML = "Saved <br>Answer";
  clearButton.innerHTML = "Clear";
}

submitButton.addEventListener("click", sendRequest);
saveButton.addEventListener("click", saveInformation);