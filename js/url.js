const redirect = pagename => {
  window.location.href = `${pagename}`;
};

const logout = () => {
  fetch(`${baseUrl}/auth/logout`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      localStorage.setItem('thetoken', null);
      redirect('Sign-In.html');
    })
    .catch(error => {
      console.log(error);
    });
};
