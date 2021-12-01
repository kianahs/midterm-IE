// get user data from API and return the json value.
const submitButton = document.querySelector(".submitButton");
const nameField = document.querySelector(".nameField");

async function getNameData(name) {
  console.log("request");
  console.log(name);

  try {
    let response = await fetch(`https://api.genderize.io/?name=${name}`);
    let json = await response.json();
    if (response.status == 200) {
      console.log(json);
      return json;
    }
    // handleError(json);
    return Promise.reject(`Request failed with error ${response.status}`);
  } catch (e) {
    showErrorMessage(e);
    console.log(e);
  }
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
    if (nameData == null) return;
    // findPopLang(name);
    window.localStorage.setItem(name, JSON.stringify(nameData));
  }
  // findPopLang(name);
  // fillProfileCard(nameData);
}

submitButton.addEventListener("click", sendRequest);
