//START OF USER REGISTRATION

var regform = document.getElementById('registration-form');

regform.addEventListener('submit', function(event) {

    event.preventDefault();
    var url = 'http://127.0.0.1:5000/api/v1/auth/signup';


    const fname = document.getElementById('fname').value
    const lname = document.getElementById('lname').value
    const uname = document.getElementById('uname').value
    const regmail = document.getElementById('regmail').value
    const regpass = document.getElementById('regpass').value

    var data = {first_name: fname,
                last_name: lname,
                username: uname,
                email: regmail,
                password : regpass};

    fetch(url, {

  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json'
  }
})
    .then(res => res.json(res.status))
    .then(data => openDialog(data.message))
})

//END OF USER REGISTRATION

//START OF USER LOGIN

var regform = document.getElementById('registration-form');

regform.addEventListener('submit', function(event) {

    event.preventDefault();
    var url = 'http://127.0.0.1:5000/api/v1/auth/signup';


    const fname = document.getElementById('fname').value
    const lname = document.getElementById('lname').value
    const uname = document.getElementById('uname').value
    const regmail = document.getElementById('regmail').value
    const regpass = document.getElementById('regpass').value

    var data = {first_name: fname,
                last_name: lname,
                username: uname,
                email: regmail,
                password : regpass};

    fetch(url, {

  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json'
  }
})
    .then(res => res.json(res.status))
    .then(data => openDialog(data.message))
})

//END OF USER REGISTRATION


let dialog = document.getElementById('dialog');
let message = document.getElementById('message');
let gotit = document.getElementById('gotit')

function openDialog(data){
//OPENS DIALOG-BOX AND DISPLAYS RESPONSE MESSAGE

    dialog.classList.remove("is-hidden");
    message.innerHTML = data

}


function closeDialog(){
//CLOSES DIALOG-BOX AND DISPLAYS RESPONSE MESSAGE

    dialog.classList.add("is-hidden");

}

gotit.onclick = function () {

   closeDialog()
}
