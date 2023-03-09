const body = document.querySelector("body");
const backgroundModale = document.querySelector(".background_modale");
const modale = document.querySelector(".modale");
const blocModaleCross = document.querySelector(".bloc_modale_cross");
const modaleCross = document.querySelector(".fa-sharp.fa-solid.fa-xmark.fa-2x");
const authButton = document.querySelector(".loginout");
const modaleContent = document.querySelector(".modale_content");

backgroundModale.addEventListener("click", function () {
    hideModale();
});

modale.addEventListener("click", function (event) {
    event.stopPropagation();
});

modaleCross.addEventListener("click", function () {
    hideModale();
});


async function init() {
    const request = await fetch('http://localhost:5678/api/categories');
    const categories = await request.json();
    const works = await getWorks();

    insertCategories(categories, works);
    /*Ajout de la liste complète au chargement de la page*/
    insertWorks(null, works);

    if (localStorage.getItem("token")) {
        manageAdminHomePage(works, categories);
    }
};

function manageAdminHomePage(works, categories) {
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

    authButton.innerText = "logout";
    iconeBanner.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    textBanner.innerText = "modifier";
    buttonBanner.innerText = "publier les changements";
    buttonPic.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';
    buttonText.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';
    buttonProjects.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>';

    buttonPic.classList.add("admin_button_pic");
    buttonText.classList.add("admin_button_text");
    buttonProjects.classList.add("admin_button_projects");

    upAdminBanner.appendChild(iconeBanner);
    upAdminBanner.appendChild(textBanner);
    upAdminBanner.appendChild(buttonBanner);
    buttonChangeAdminPic.appendChild(buttonPic);
    buttonChangeAdminText.appendChild(buttonText);
    buttonChangeProjects.appendChild(buttonProjects);

    buttonProjects.addEventListener("click", function () {
        showModale("editProject", works, categories);
    });

    authButton.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("token");
        location.reload();
    });
};

function showModale(content, works, categories) {
    modaleContent.innerHTML = "";
     
    body.classList.add("modale_on");

    if (content === "editProject") {
        insertManagingWorksInModale(works, categories);
    }
    else if (content === "addProject") {
        insertAddWorkToModale(works, categories);
    }
};

function insertManagingWorksInModale(works, categories) {
    const titleModale = document.createElement("h2");
    const projectsContent = document.createElement("div");
    const line = document.createElement("hr");
    const addProjectsButton = document.createElement("button");
    const deleteProjectsButton = document.createElement("button");
    const downButtonsBloc = document.createElement("div");

    titleModale.innerText = "Galerie photo";
    addProjectsButton.innerText = "Ajouter une photo";
    deleteProjectsButton.innerText = "Supprimer la galerie";

    projectsContent.classList.add("projects_content");
    downButtonsBloc.classList.add("down_buttons_bloc");
    addProjectsButton.classList.add("add_projects_button");
    deleteProjectsButton.classList.add("delete_projects_button");

    modaleContent.appendChild(titleModale);

    works.forEach(function (work) {
        const editButton = document.createElement("button");
        const trash = document.createElement("div");
        const projectContent = document.createElement("div");
        const image = document.createElement("img");

        projectContent.classList.add("project_content");

        editButton.innerText = "éditer";
        image.crossOrigin = "anonymous";
        image.src = work.imageUrl;
        trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        projectsContent.appendChild(projectContent);
        projectContent.appendChild(image);
        projectContent.appendChild(trash);
        projectContent.appendChild(editButton);

        trash.addEventListener('click', () => {
            deleteWork(projectContent, work.id);
        });
    });

    modaleContent.appendChild(projectsContent);
    modaleContent.appendChild(line);
    modaleContent.appendChild(downButtonsBloc);
    downButtonsBloc.appendChild(addProjectsButton);
    downButtonsBloc.appendChild(deleteProjectsButton);

    addProjectsButton.addEventListener('click', function () {
        showModale("addProject", works, categories);
    });
};

function insertAddWorkToModale(works, categories) {
    const titleAddProject = document.createElement("h2");
    const formulaire = document.createElement("form");
    const imageContainer = document.createElement("div");
    const imageIcon = document.createElement("i");
    const imageLabel = document.createElement("label");
    const imageInput = document.createElement("input");
    const informationAddImage = document.createElement("p");
    const titleContainer = document.createElement("div");
    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    const categoryContainer = document.createElement("div");
    const categoryLabel = document.createElement("label");
    const categorySelect = document.createElement("select");
    const option0 = document.createElement("option");
    const line = document.createElement("hr");
    const validationButton = document.createElement("button");
    const iconBack = document.createElement("i");

    //créer une fonction qui valide les trois champs
    
    function verify() {
        validationButton.disabled = true;
        const file = imageInput.files[0];

        if (!file) {
            return;
        }

        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            alert("Veuillez sélectionner le bon format photo");
            return;
        }
        if (file.size >= 4000000) {
            alert("Veuillez sélectionnez une photo < ou = à 4Mo");
            return;
        }

        if (titleInput.value === "") {
            return;
        }

        if (categorySelect.value === "") {
            return;
        }
        
        validationButton.disabled = false;

        return true;
    };

    iconBack.classList.add("icon_back");
    iconBack.innerHTML = '<i class="fa-solid fa-arrow-left fa-2x"></i>';
    titleAddProject.innerText = "Ajout photo";
    formulaire.classList.add("add_work");
    imageContainer.classList.add("image_container");
    imageIcon.innerHTML = '<i class="fa-sharp fa-solid fa-image fa-2x"></i>';
    imageLabel.innerText = "+ Ajouter photo";
    imageLabel.htmlFor = "file";
    imageInput.id = "file";
    imageInput.type = "file";
    imageInput.name = "image";
    imageInput.classList.add("image_input");
    informationAddImage.innerText = "jpg, png : 4 mo max";
    titleContainer.classList.add("title_container");
    titleLabel.innerText = "Titre";
    titleInput.name = "title";
    titleInput.type = "text";
    categoryContainer.classList.add("category_container");
    categoryLabel.innerText = "Catégorie";
    categorySelect.name = "category";
    option0.value = "";
    validationButton.classList.add("validation_button");
    validationButton.innerText = "Valider";
    validationButton.disabled = true;

    modaleContent.appendChild(iconBack);
    modaleContent.appendChild(titleAddProject);
    modaleContent.appendChild(formulaire);
    formulaire.appendChild(imageContainer);
    formulaire.appendChild(imageInput);
    imageContainer.appendChild(imageIcon);
    imageContainer.appendChild(imageLabel);
    imageContainer.appendChild(informationAddImage);
    formulaire.appendChild(titleContainer);
    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);
    formulaire.appendChild(categoryContainer);
    categoryContainer.appendChild(categoryLabel);
    categoryContainer.appendChild(categorySelect);
    categorySelect.appendChild(option0);

    categories.forEach(function(category) {
        const option = document.createElement("option");
        option.value = category.id;
        option.innerText = category.name;
        categorySelect.appendChild(option);
    });

    modaleContent.appendChild(line);
    modaleContent.appendChild(validationButton);

    iconBack.addEventListener('click', () => {
        showModale("editProject", works, categories);
    });

    imageInput.addEventListener('change', () => {
        //dans verify() : on valide que c'est un png ou un jpeg et que ça fasse < ou = à 4 Mo
        //si valide, on efface tout ce qu'il y a dans imageContainer
        //on va créer un élément img et on va lui attribuer la source à travers la propriété src
        //j'appendchild dans imageContainer l'élément img
        const file = imageInput.files[0];

        if (!file) {
            return;
        }

        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            alert("Veuillez sélectionner le bon format photo");
            return;
        }
        if (file.size >= 4000000) {
            alert("Veuillez sélectionnez une photo < ou = à 4Mo");
            return;
        }

        const addedImage = document.createElement ("img");
        
        imageContainer.innerHTML = "";
        addedImage.src = URL.createObjectURL(file);

        imageContainer.appendChild(addedImage);
    
        verify();
    });
    //1 event 'input' pour le title
    titleInput.addEventListener('input', () => {
        verify();
        
    });
    //1 event change pour la catégorie
    categorySelect.addEventListener('change', () => {
        verify();
    });
    
    validationButton.addEventListener('click', async function() {
        if (verify() == true) {
            let workData = new FormData(formulaire);
    
            
            
            const request = await fetch("http://localhost:5678/api/works", {
                method: 'POST',
                headers: { 
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: workData
            });
            
            if (request.ok) {             
                const result = await request.json();
                location.href = "index.html";
            } else {
                alert("Veuillez remplir correctement les champs demandés");
            }
        }
    });    
};
    

        
    /*let form = document.querySelector(".modale_add_project form");
    
imageInput.addEventListener("click", async function(event) {
  event.preventDefault();
  
  let loginData = new FormData(formulaire);
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
});*/

async function deleteWork(content, workId) {
    const request = await fetch(`http://localhost:5678/api/works/${workId}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        method: "DELETE"
    });

    if (request.ok) {
        content.remove();
    } else {
        alert("error");
    }
};

function hideModale() {
    body.classList.remove("modale_on");
    modaleContent.innerHTML = "";
};

async function getWorks() {
    const request = await fetch('http://localhost:5678/api/works');
    return await request.json();
};

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