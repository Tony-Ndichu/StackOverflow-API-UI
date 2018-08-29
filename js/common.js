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

