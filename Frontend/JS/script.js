/*<figure>getWorks
		<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
		<figcaption>Abajour Tahina</figcaption>
</figure>*/

async function init() {
    const request = await fetch('http://localhost:5678/api/categories');
    const results = await request.json();
    const works = await getWorks();

    insertCategories(results, works);
    /*Ajout de la liste complète au chargement de la page*/
    insertWorks(null, works);
}
 
async function getWorks() {
    const request = await fetch('http://localhost:5678/api/works');
    return await request.json();
}
/*
let user = {
    email: 'sophie.bluel@test.tld',
    password: 'S0phie '
};

let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;
  },
  body: JSON.stringify(user)
});

let result = await response.json();
alert(result.message);*/

const gallery = document.querySelector(".gallery");
const categoriesContainer = document.querySelector(".categories");

function insertWorks(category, works) {
    gallery.innerHTML = "";
  
    works.forEach((work) => {
        console.log(work);
        /*si je n'envoie pas de catégories, je veux tout voir, tous les works.
        ou
        si la catégorie appartient à la catégorie du work, je veux la filtrer.*/
        if (!category || category.id === work.categoryId) {
            const figure = document.createElement("figure");
            const image = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            
            image.src = work.imageUrl;
            image.alt = work.title;
            image.crossOrigin = "anonymous";
            figcaption.innerText = work.title;
            
            figure.appendChild(image);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }
    });
}

/*j'affiche n boutons*/
function insertCategories(categories, works) {
    
    const button = document.createElement("button");
    /*je nomme mon bouton*/
    button.innerText = "Tous";
    /*ajout de l'evenement clique pour ecouter le bouton, avec null en catégorie correspondant à 
    "!category" dans la boucle de la fonction instertWorks, pour avoir tous les works*/
    button.addEventListener('click', () => {
        insertWorks(null, works);
    });

    categoriesContainer.appendChild(button);

    categories.forEach((category) => {
        /*pour chaque élément du tableau "categories", que tu appelleras "category", fait ça : */
        const button = document.createElement("button");
        /*a mon élement bouton, je lui donne le texte de la catégorie courante (celle de mon itération)*/
        button.innerText = category.name;
        /*ajout de l'evenement clique pour ecouter le bouton*/
        button.addEventListener('click', () => {
            insertWorks(category, works);
        });

        categoriesContainer.appendChild(button);
    });
}


/*est-ce-que le nav a accès à la méthode fetch?
si oui, on appelle la fonction asynchrone init
sinon, dégage*/
if (window.fetch) {
    init();
} else {
    alert('degage');
}