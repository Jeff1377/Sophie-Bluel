/*instancier les élémentst, formulaire et bouton dans deux variables*/

/*ajouter un evenement click pour appeller l'api avec la donnée presente dans le formulaire*/
/*si l'api retourne le token : stocker le token, et rediriger sur la page d'accueil*/
/*Si l'api retourne une erreur, afficher un message d'erreur sur une alerte...*/
let form = document.querySelector("#login form");
let button = document.querySelector("#login button");


button.addEventListener("click", async function(event) {
  event.preventDefault();
  
  let loginData = new FormData(form);
  const data = {
    email: loginData.get("email"),
    password: loginData.get("password")
  }  

  const request = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  
  if (request.ok) {
    const result = await request.json();
    localStorage.setItem("token", result.token);
    location.href = "index.html";
  } else {
    alert("Utilisateur ou mot de passe incorrect");
  }
});