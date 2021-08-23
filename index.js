const saxeli = document.getElementById("name");
const message = document.getElementById("message");
const button = document.getElementById("buttoni");
const messageBox = document.getElementById("messagebox");
const info = document.getElementById("info");

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
            `<li class="list-group-item"><span style="color:grey; font-size: 10px">${i.name}</span> ${i.message}</li>`
          );
        }
        messageBox.innerHTML = htmls.join("");
      });
  });
}

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
  if (saxeli.value && message.value) {
    fetch(
      "https://httprequeststudy-default-rtdb.firebaseio.com/messages.json",
      {
        method: "POST",
        body: JSON.stringify({
          name: saxeli.value,
          message: message.value,
        }),
      }
    ).then((response) => {
      saxeli.value = "";
      message.value = "";
    });
  } else {
    info.style.display = "block";
    saxeli.style.borderColor = "red";
    message.style.borderColor = "red";
    console.log("არ მუშაობს");

    if (saxeli.value) {
      saxeli.style.borderColor = "lightgrey";
    }
    if (message.value) {
      message.style.borderColor = "lightgrey";
    }
    
  }
}


function deleteMessage(){
  fetch('https://httprequeststudy-default-rtdb.firebaseio.com/messages.json', {
    method: 'DELETE'
  }).then(response => {
    console.log(response)
  })
}

function vswavlob(info){
  console.log(info)
  info.style.backgroundColor = 'grey'
}