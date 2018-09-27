baseUrl = 'https://finalstack.herokuapp.com/api/v1';

var token = localStorage.getItem('thetoken');


const redirect = (pagename) => {
    window.location.href = `${pagename}`
}

const logout = () =>{
		fetch(`${baseUrl}/auth/logout`, {

		  method: 'POST', // or 'PUT'
		  headers:{
		    "Access-Control-Allow-Origin": "*",
		    'Content-Type': 'application/json',
		    'Authorization': 'Bearer '+ token
		  }
		})
		    .then((res) => {
    		    localStorage.setItem('thetoken', null);
    		    redirect("Sign-In.html")
		            });
			}