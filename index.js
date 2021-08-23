const message = document.getElementById("message");
const button = document.getElementById("buttoni");
const messageBox = document.getElementById("messagebox");
const info = document.getElementById("info");
const spinner = document.getElementById("spinner");

let messages = [];
let length;



function getData() {
  fetch(
    "https://httprequeststudy-default-rtdb.firebaseio.com/messages.json"
  ).then((response) => {
    response
      .json()
      .then((data) => {
        const transformedData = [];
        for (let i in data) {
          transformedData.push(data[i]);
        }
        return transformedData;
      })
      .then((data) => {
        messages = data;
        const htmls = [];
        for (let i of messages) {
          htmls.push(
            `<li class="list-group-item"><span style="color:grey; font-size: 10px">Incognito</span> ${i.message}</li>`
          );
        }
        messageBox.innerHTML = htmls.join("");

        spinner.innerHTML = `<div style="display: none!important"  class="spinner-border d-flex justify-content-center mt-2 spinner-border-sm" role="status">
        <span class="sr-only"></span>
    </div>`;

      });
  });
}
getData();

setInterval(() => {
  getData();
}, 1000);

function checkValidInput(element) {
  if (element.value === "") {
    element.style.borderColor = "red";
  } else {
    element.style.borderColor = "lightgrey";
    info.style.display = "none";
  }
}

function sendMessage() {
  if (message.value) {
    spinner.innerHTML = `<div style="display: block!important"  class="spinner-border d-flex justify-content-center mt-2 spinner-border-sm" role="status">
    <span class="sr-only"></span>
</div>`;

    fetch(
      "https://httprequeststudy-default-rtdb.firebaseio.com/messages.json",
      {
        method: "POST",
        body: JSON.stringify({
          message: message.value,
        }),
      }
    )
      .then((response) => {
        message.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    info.style.display = "block";
    message.style.borderColor = "red";

    if (message.value) {
      message.style.borderColor = "lightgrey";
    }
  }
}

message.addEventListener('keydown', (e)=>{
  if(e.keyCode === 13){
    sendMessage()
  }
 
} )

function deleteMessage() {
  fetch("https://httprequeststudy-default-rtdb.firebaseio.com/messages.json", {
    method: "DELETE",
  }).then((response) => {
    
  });
}


