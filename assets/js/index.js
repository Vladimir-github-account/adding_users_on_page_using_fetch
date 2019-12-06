"use strict";



/*const executor = function (resolve, reject) {
    const request = new XMLHttpRequest();

    request.onload = () => {
        resolve(JSON.parse(request.responseText));
    };
    request.onerror = () => {
        reject(new Error(`${request.status} ${request.statusText}`));
    };
    request.open('GET', './user.json');
    request.send();

};

const loadUserPromise = new Promise(executor);

loadUserPromise
    .then(appendUserItemToList)
    .catch(console.error);*/

/*loadUserPromise
    .then(appendUserItemToList,console.error);*/


// fetch return promise, promise have .then method
fetch("./user.json")
    .then(response => response.json())//fetchPromise
    .then(appendUserItemToList)//jsonPromise
    .catch(console.error);

// if we want uniq error handler in one of '.then' we can add it by second aparameter
// .then(appendUserItemToList, myErrorHandler)



function createUserItem(user) {
    const userItemContainer = document.createElement("li");
    userItemContainer.classList.add("userItem");
    userItemContainer.appendChild(createImageElem(user));
    userItemContainer.appendChild(createUserFullNameElem(user));
    userItemContainer.appendChild(createUserAgeElem(user));
    return userItemContainer;
}

function createUserFullNameElem(user) {
    const userFullNameElem = document.createElement("h3");
    userFullNameElem.classList.add("fullName");
    userFullNameElem.innerText = `${user.name} ${user.surname}`;
    return userFullNameElem;
}

function createUserAgeElem(user) {
    const userAgeElem = document.createElement("h4");
    userAgeElem.classList.add("age");
    userAgeElem.innerText = user.age;
    return userAgeElem;
}

/*          string to color javascript      */
function hashCode(str) { // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i){
    let c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

let stringToColour = function(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
};


function createImageElem(user) {
    const userImageContainer =  document.createElement("div");
    userImageContainer.classList.add("imageContainer");

    /*ADDING USER IMAGE IN THE 'userImageContainer'*/
    const userImage = document.createElement("img");
    userImage.setAttribute("src",`${user.picturePath}` );
    userImage.onerror = () => {
        userImageContainer.style.backgroundColor = stringToColour(user.name);;
        // userImage.setAttribute("src", "https://www.netclipart.com/pp/m/244-2441803_profile-pic-icon-png.png");
        // if we want add picture
        userImageContainer.innerText = `${user.name[0]}${user.surname[0]}`;
    };
    userImage.setAttribute("alt",`profile`);

    /*APPEND 'userImage'*/
    userImageContainer.appendChild(userImage);

    return userImageContainer;
}

function appendUserItemToList(users) {
    const userListElem = document.getElementById("userList");
    users.forEach(element =>
        userListElem.appendChild(createUserItem(element))
    );

}

