var token = localStorage.getItem('thetoken');


const makeElement = (first_name, last_name, username, email, questions, answers, parentId,  elementType) => {
    elem = document.createElement(elementType)

    elem.innerHTML = `<p class="prof-label">Full name</p> <p class="prof-deet">${first_name} ${last_name}</p>
          <p class="prof-label">Username</p> <p class="prof-deet">${username}</p>
          <p class="prof-label">Email</p> <p class="prof-deet">${email}</p>
          <p class="prof-label">Questions asked</p> <p class="prof-deet">${questions} questions</p>
          <p class="prof-label">Answers given</p> <p class="prof-deet">${answers} answers</p>`

    parentElem = document.getElementById(parentId)
    parentElem.append(elem)
}


const getProfile = () => {
    console.log("Fetching user_profile ...")
    fetch(`${baseUrl}/auth/profile` , {
        method: "GET",
          headers:{
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token
  },
    })
    .then((res) => {
        res.json().then((data) => {

				for (let i in data.list) {
					makeElement(data.list[i]['first_name'],data.list[i]['last_name'], data.list[i]['username'], data.list[i]['email'], data.list[i]['no_of_questions'], data.list[i]['no_of_answers'], 'profile', 'div')
				}

			});
        });
    }


const getUserRecent = () =>{
  
}