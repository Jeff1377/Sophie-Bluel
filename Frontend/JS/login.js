
let user = {
    email: 'sophie.bluel@test.tld',
    password: 'S0phie '
};

let response = await fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;'
  },
  body: JSON.stringify(user)
});

let result = await response.json();
//alert(result.message);
console.log(result.message);

