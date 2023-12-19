var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");

var mainBtn = "submit";
var temp;

var allData = [];

// check if the local storage have data or not
if (localStorage.getItem("allData") != null) {
  allData = JSON.parse(localStorage.getItem("allData"));
  displayAllData();
}

// add New data
function addNewData() {
  var siteNameValidation = validateSiteName();
  var siteUrlValidation = validateSiteUrl();
  if (siteNameValidation.valid && siteUrlValidation.valid) {
    var Data = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    if (mainBtn === "submit") {
      allData.push(Data);

      localStorage.setItem("allData", JSON.stringify(allData));

      displayAllData();
    } else {
      //Update existing Data
      allData[temp] = Data;
      Submit.innerHTML = "Submit";
      mainBtn = "submit";
      localStorage.setItem("allData", JSON.stringify(allData));
      displayAllData();
    }
    clearInputs();
  } else {
    alert(siteNameValidation.error + "\n" + siteUrlValidation.error);
  }
}

// clear inputs
function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

// delete button function
function deleteData(idx) {
  allData.splice(idx, 1);
  localStorage.setItem("allData", JSON.stringify(allData));
  displayAllData();
}

// display data every time any data added
function displayAllData() {
  var cartona = "";

  for (var i = 0; i < allData.length; i++) {
    cartona += `<tr>
    <td>${[i + 1]}</td>
    <td>${allData[i].siteName}</td>
    <td>
      <button class="btn btn-success">
            <i class="fa-solid fa-eye"></i>
            <a href="${
              "https://" + allData[i].siteUrl
            }" target="_blank">Visit</a>
          </button>
    </td>
    <td>
      <button onclick="editData(${i})" class="btn btn-warning text-white">
            <i class="fa-solid fa-pen-to-square text-white"></i> Edit
          </button>
    </td>
    
    <td>
      <button onclick="deleteData(${i})" class="btn btn-danger">
        <i class="fa-solid fa-trash-can"></i> Delete
      </button>
    </td>
  </tr>`;
  }

  document.getElementById("tableBody").innerHTML = cartona;
}

// Validation for site Name
function validateSiteName() {
  var nameRegex = /^[a-zA-Z0-9-]{3,}$/;
  var isValid = nameRegex.test(siteNameInput.value);
  return {
    valid: isValid,
    error: isValid ? "" : "Site name must contain at least 3 characters.",
  };
}

// Validation for site URL
function validateSiteUrl() {
  var urlRegex = /^(www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  var isValid = urlRegex.test(siteUrlInput.value);
  return {
    valid: isValid,
    error: isValid ? "" : 'Site URL must start with "www." to be valid.',
  };
}

// Edit data button

function editData(i) {
  siteNameInput.value = allData[i].siteName;
  siteUrlInput.value = allData[i].siteUrl;
  Submit.innerHTML = "Update";
  mainBtn = "update";
  temp = i;
}
