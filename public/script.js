let peopleCount = 0;

const peopleCountElement = document.getElementById("peopleCount");
peopleCountElement.innerHTML = peopleCount;

const IncidentTypeSelectElement = document.getElementById("IncidentType");
const procedureElement = document.getElementById("procedure");

let incidentType;
let incidentTypeSelected = 1;

fetch("http://localhost:4000/getIncidentType")
  .then((response) => response.json())
  .then((data) => {
    incidentType = data;
    incidentType.forEach((element, index) => {
      var incidentOption = document.createElement("option");
      incidentOption.value = element.incidentType;
      incidentOption.text = element.description;
      IncidentTypeSelectElement.appendChild(incidentOption);
    });

    getSOP(incidentTypeSelected);
  })
  .catch((error) => console.error("Error:", error));

const getSOP = (selected) => {
  procedureElement.innerHTML = "";

  const sop_lists = incidentType.find(
    (element) => element.incidentType == selected
  ).sop_lists;

  if (sop_lists) {
    sop_lists.forEach((element) => {
      var procedureOption = document.createElement("option");
      procedureOption.value = element.procedureID;
      procedureOption.text = element.description;
      procedureElement.appendChild(procedureOption);
    });
  }
};

const addHandler = () => {
  peopleCount++;
  axios.post();
  peopleCountElement.innerHTML = peopleCount;
};

const minusHandler = () => {
  if (peopleCount > 0) {
    peopleCount--;
    peopleCountElement.innerHTML = peopleCount;
  }
};

function submitIncidentHandler(event) {
  event.preventDefault();
  const formElement = document.getElementById("incidentForm");
  const formData = new FormData(formElement);

  fetch("http://localhost:4000/insertIncident", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data as needed
      console.log("Success:", data);
    })
    .catch((error) => {
      // Log the raw response text for debugging
      response.text().then((text) => {
        console.error("Error:", error);
        console.error("Raw response text:", text);
      });
    });
}
