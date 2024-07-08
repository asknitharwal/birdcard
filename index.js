let cont = document.getElementById("container");
let form = document.getElementById("birdForm");
let btn = document.getElementById("btn");

let arr = [];
let flag = false;
let currentId = null;

async function postValue() {
    let birdData = {
        name: document.getElementById("name").value,
        species: document.getElementById("species").value,
        description: document.getElementById("description").value,
        photo: document.getElementById("photo").value
    };
    // console.log(birdData);
    try {
        let res = await axios.post("https://json-server-deployment-cles.onrender.com/birds", birdData);
        console.log(res.data);
        alert("New Bird Card Added Successfully"); 
        
        form.reset()
        getValueApi();
    } catch (error) {
        console.log(error);
    }
}

async function getValueApi() {
    try {
        let res = await axios.get("https://json-server-deployment-cles.onrender.com/birds");
        arr = res.data;
        displayData();
    } catch (error) {
        console.log(error);
    }
}

function displayData() {
    cont.innerHTML = "";
    arr.forEach((item) => {
        let card = document.createElement("div");
        card.className = 'card';

        let image = document.createElement("img");
        image.src = item.photo;
        image.alt = "bird";

        let name = document.createElement("h3");
        name.innerText = item.name;

        let species = document.createElement("h4");
        species.innerText = item.species;

        let description = document.createElement("p");
        description.innerText = item.description;

        let edit = document.createElement("button");
        edit.innerText = "Edit";
        edit.id = "edit";
        edit.addEventListener("click", () => {
            editData(item);
        });

        let del = document.createElement("button");
        del.innerText = "Delete";
        del.id = "del";
        del.addEventListener("click", () => {
            deleteData(item.id);
        });

        card.append(image, name, species, description, edit, del);
        cont.append(card);
    });
}

// Edit function
function editData(data) {
    document.getElementById("name").value = data.name;
    document.getElementById("species").value = data.species;
    document.getElementById("description").value = data.description;
    document.getElementById("photo").value = data.photo;
    btn.innerText = "Update";
    flag = true;
    currentId = data.id;
}

async function updateValue() {
    let newData = {
        name: document.getElementById("name").value,
        species: document.getElementById("species").value,
        description: document.getElementById("description").value,
        photo: document.getElementById("photo").value
    };
    try {
        let res = await axios.patch(`https://json-server-deployment-cles.onrender.com/birds/${currentId}`, newData);
        alert("Your data updated successfully");
        // console.log(res);
        flag = false;
    btn.innerText = "Add Bird ";
        getValueApi();
        form.reset()
    } catch (error) {
        console.log(error);
    }
}

async function deleteData(id) {
    try {
        let res = await axios.delete(`https://json-server-deployment-cles.onrender.com/birds/${id}`);
        getValueApi();
        alert("Your data deleted successfully");
    } catch (error) {
        console.log(error);
    }
}

btn.addEventListener("click", (e) => {
    e.preventDefault(); 
    if (flag) {
        updateValue();
       
    } else {
        postValue();
  
    }
});

// Initial data load
getValueApi();
