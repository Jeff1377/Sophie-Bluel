const body = document.querySelector("body");
const backgroundModale = document.querySelector(".background_modale");
const modale = document.querySelector(".modale");
const modaleCross = document.querySelector(".fa-solid.fa-square-xmark");

backgroundModale.addEventListener("click", function() {
    hideModale();
});

modale.addEventListener("click", function(event) {
    event.stopPropagation();
});

modaleCross.addEventListener("click", function() {
    hideModale();
});


async function init() {
    const request = await fetch('http://localhost:5678/api/categories');
    const results = await request.json();
    const works = await getWorks();

    insertCategories(results, works);
    /*Ajout de la liste complète au chargement de la page*/
    insertWorks(null, works);

    if (localStorage.getItem("token")) {
        manageAdminHomePage();
    }
};
 
function manageAdminHomePage() {
    const upAdminBanner = document.querySelector(".edit_banner");
    const buttonChangeAdminPic = document.querySelector(".edit_user_pic");
    const buttonChangeAdminText = document.querySelector(".edit_text");
    const buttonChangeProjects = document.querySelector(".edit_projects");

    const iconeBanner = document.createElement('i');
    const textBanner = document.createElement('p');
    const buttonBanner = document.createElement('button');
    const buttonPic = document.createElement('button');
    const buttonText = document.createElement('button');
    const buttonProjects = document.createElement('button');

    iconeBanner.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    textBanner.innerText = "modifier";
    buttonBanner.innerText = "publier les changements";
    buttonPic.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';
    buttonText.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';
    buttonProjects.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';

    buttonPic.classList.add("admin_button");
    buttonText.classList.add("admin_button");
    buttonProjects.classList.add("admin_button");

    upAdminBanner.appendChild(iconeBanner);
    upAdminBanner.appendChild(textBanner);
    upAdminBanner.appendChild(buttonBanner);
    buttonChangeAdminPic.appendChild(buttonPic);
    buttonChangeAdminText.appendChild(buttonText);
    buttonChangeProjects.appendChild(buttonProjects);

    buttonPic.addEventListener("click", function() {
        showModale();
    });
    buttonText.addEventListener("click", function() {
        showModale();
    });
    buttonProjects.addEventListener("click", function() {
        showModale();
    });
};

function showModale() {
    body.classList.add("modale-on");
};
function hideModale() {
    body.classList.remove("modale-on");
};

async function getWorks() {
    const request = await fetch('http://localhost:5678/api/works');
    return await request.json();
}

const gallery = document.querySelector(".gallery");
const categoriesContainer = document.querySelector(".categories");

function insertWorks(category, works) {
    gallery.innerHTML = "";
  
    works.forEach((work) => {
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