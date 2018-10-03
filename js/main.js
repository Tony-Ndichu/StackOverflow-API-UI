
//THIS THE MENU JS CODE

let theMenuButton = document.getElementById('menu');

let theCloseButton = document.getElementById('closer');


const showMenu = () =>{
	theMenuButton.onclick = function () {
	toggleMenuBody()
	toggleCloseButton()

	
}
}

const hideMenu = () =>{
	theCloseButton.onclick = function () {
	toggleMenuBody()
	toggleCloseButton()
	

}
}

const toggleMenuBody = () =>{ 

	var menuid = document.getElementById("bodyMenu")

if ( menuid.classList.contains('not-visible') ){

menuid.classList.remove('not-visible');
menuid.classList.add('visible');
 
}else{
	menuid.classList.remove('visible');
menuid.classList.add('not-visible');
}
}


const toggleMenuButton = () =>{
	
	var menu_button = document.getElementById("menu")

if ( menu_button.classList.contains('show') ){

menu_button.classList.remove('show');
menu_button.classList.add('hide');
 
}else{
	menu_button.classList.remove('hide');
	menu_button.classList.add('show');
}
}


const toggleCloseButton = () =>{
	
	var close_button = document.getElementById("closer")

if ( close_button.classList.contains('show') ){

close_button.classList.remove('show');
close_button.classList.add('hide');
 
}else{
	close_button.classList.remove('hide');
	close_button.classList.add('show');
}
}

//THIS IS THE MODAL JS CODE


var overlay = document.getElementById('overlay');
let modalOpener = document.getElementById('open-modal')
let modalCloser = document.getElementById('close-modal')



const openModal = () =>{
//CHECK FIRST IF MODAL EXISTS IN PAGE
	var element =  document.getElementById('open-modal');
if (typeof(element) != 'undefined' && element != null)
{
	modalOpener.onclick = () =>{
         overlay.classList.remove("is-hidden");
     }
 }
}


const closeModal = () =>{

//CHECK FIRST IF MODAL EXISTS IN PAGE
	var element =  document.getElementById('close-modal');
if (typeof(element) != 'undefined' && element != null)
{
	modalCloser.onclick = () =>{

   overlay.classList.add("is-hidden");
}
}
}

var user_name = localStorage.getItem('user_name');

const showName = () => {
	let header_name = document.getElementById('username-header');

	header_name.innerHTML = `${user_name}`
}

//TO ENSURE THESE JS FILES ONLY RUN WHEN DOM ELEMENTS HAVE LOADED
window.onload = () =>{
		console.log(window.location.pathname)
		showName()

	showMenu()
	hideMenu()
	openModal()
	closeModal()
	if (window.location.pathname == "/Users/antonyndichu/Desktop/frontend/StackOverflow-API-UI/UserProfile.html"){
	profilePage()
}

	if (window.location.pathname == "/Users/antonyndichu/Desktop/frontend/StackOverflow-API-UI/ViewQuestion.html"){
	openQuestion()
}
}
