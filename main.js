let firstname = document.querySelector("#Firstname");
let lastname = document.querySelector("#Lastname");
let password = document.querySelector("#password");
let Confirmpassword = document.querySelector("#Confirmpassword");
let email = document.querySelector("#Email");
let phone = document.querySelector("#phone");

let form = document.querySelector("#RegForm");

let succesAlert = document.querySelector("#scAlert");
let DangAlert = document.querySelector("#DgAlert");

let passwHelper = document.querySelector("#passwH");
let ConfirmHelper = document.querySelector("#confirmHelper");
let table = document.querySelector("#Usertable tbody");

let NewID = 1;

GenerateID();
document.addEventListener("DOMContentLoaded", getUsers)
//submit event 


form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (checkEmptyFeild(firstname) && checkEmptyFeild(lastname) && checkEmptyFeild(password) && checkEmptyFeild(Confirmpassword) && checkEmptyFeild(email) && checkEmptyFeild(phone)) {
		if (!checkPasswordLength) {
			checkPasswordLength();
			return
		}


		if (!checkPasswordConfirmpass) {
			checkPasswordConfirmpass();
			return
		}

		registernewUser(firstname, lastname, password, email, phone)

		scAlert.textContent = "Success full registered.....";
		scAlert.classList.add("d-block");
		form.reset();


	} else {
		event.preventDefault();
		checkEmptyFeild(firstname);
		checkEmptyFeild(lastname);
		checkEmptyFeild(password);
		checkEmptyFeild(Confirmpassword);
		checkEmptyFeild(email);
		checkEmptyFeild(phone);

	}



});

//check the empty feilds
[]
function checkEmptyFeild(feild) {

	if (feild.value == "") {
		feild.classList.add("border", "border-danger")
		DgAlert.textContent = "All feild Must No Empty.....";
		DgAlert.classList.add("d-block");
		return;
	} else (
		feild.classList.remove("border-danger")
	);
	DgAlert.classList.remove("d-block");
	return true;
}
//check password
function checkPasswordLength() {
	if (password.value.length < 10) {
		password.classList.add("border", "border-warning")
		passwH.textContent = "at least 10 characters"
		passwH.classList.add("text-danger");

		return
	} else {
		password.classList.remove("border-warning");
		passwHelper.textContent = ""
		return true;
	}
}
//check confirmpassword
function checkPasswordConfirmpass() {

	if (Confirmpassword.value != password.value) {
		password.classList.add("border", "border-warning");
		confirmHelper.textContent = "not matching";
		confirmHelper.classList.add("text-danger");

		return false;
	} else {
		password.classList.remove("border-warning");

		confirmHelper.textContent = ""

		return true;
	}

}
// function register
function registernewUser(firstname, lastname, password, email, phone) {
	let user = `<tr> <td>${NewID}</td> <td>${firstname.value}</td> <td>${lastname.value}</td> 
    <td>${password.value}</td>  <td>${email.value}</td>  <td>${phone.value}</td>
    </tr>`;

	table.innerHTML += user
	saveToLocalStorage(user);
}
// local storage function
function saveToLocalStorage(user) {
	let Usrr;

	if (localStorage.getItem("user") === null) {

		Usrr = [];
	} else {
		Usrr = JSON.parse(localStorage.getItem("user"));
	}
	Usrr.push(user);

	localStorage.setItem("user", JSON.stringify(Usrr));

}
// function Data somujinaaye 2
function getUsers() {
	let Usrr;

	if (localStorage.getItem("user") === null) {

		Usrr = [];

	} else {
		Usrr = JSON.parse(localStorage.getItem("user"));
	}
	Usrr.forEach(Element => {
		table.innerHTML += Element;

	});
}
// function generate id
function GenerateID() {
	let Usrr
	if (localStorage.getItem("user") === null) {
		Usrr = [];
		NewID = 1;

	} else {
		Usrr = JSON.parse(localStorage.getItem("user"));
	}
	Usrr.forEach(function (users) {

		NewID = users.substring(9, users.indexOf('</td>'));
		NewID++;
	});
}


