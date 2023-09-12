//This JS code is a header component

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
    getAuth,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { firebaseConfig } from "./Firebase.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig());

const db = getFirestore(app);
const auth = getAuth(app);
const user = auth.currentUser;

//create individual element for nav

function createNavElement() {
    var locationToken = "";

    // auth.onAuthStateChanged(function (user) {
    //     if (user) {
    //         locationToken3 =
    //         '<li><ion-icon name="log-out-outline" size="large" id="out"></ion-icon></li>';
    //         console.log(locationToken3)
    //     } else {
    //         // location.href = "stls.html";
    //     }
    // });

    //Default header li
    locationToken = `<ul class="nav">
            <li><a href="home.html">HOME</a></li>
            <li><a href="request.html">REQUEST</a></li>
            <li><a href="stls.html">STLS</a></li>
            <li><a href="learn.html">LEARN</a></li>
            <li><a href="about.html">ABOUT</a></li>
            <li><ion-icon name="sunny-outline" size="large" id="sun"></ion-icon></li>
        </ul>`;

    //Reconstruct header li if user is logged in in STLs page
    if (
        window.location.href.includes("task.html") ||
        window.location.href.includes("profile.html")
    ) {
        locationToken = `<ul class="nav">
                <li><a href="home.html">HOME</a></li>
                <li><a href="profile.html">PROFILE</a></li>
                <li><a href="task.html">TASK</a></li>
                <li><a href="learn.html">LEARN</a></li>
                <li><ion-icon name="sunny-outline" size="large" id="sun"></ion-icon></li>
                <li><ion-icon name="log-out-outline" size="large" id="out"></ion-icon></li>
            </ul>`;
    }

    const headerTemplate = document.createElement("template");
    headerTemplate.innerHTML = `
    
    <style>
    body{
        margin: 0;
        user-select: none;
    }
    
    body::-webkit-scrollbar {
        width: 0.6em;
    }
    
    body::-webkit-scrollbar-track {
        margin-block-end: 5px;
    }
    
    body::-webkit-scrollbar-thumb {
        background: #424242;
        border-radius: 100px;
    }
    
    body::-webkit-scrollbar-thumb:hover {
        background: #aaaaaa;
    }
    
    .header{
        min-width: 100%;
        height: 100px;
        background-color: transparent;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        position: absolute;
        z-index: 100;
        user-select: none;
        font-family: 'Poppins', sans-serif;
        top: 0;
    }
    
    .logo_container{
        padding-left: 3%;
        align-self: center;
    }
    
    .logo_container h1{
        color:white;
        font-size: 50px;
        font-weight: 100;
        letter-spacing: 1.2px
    }
    
    .logo_container h1 span{
        font-weight: 900;
    }
    
    .nav{
        margin: 0;
        padding-right: 3%;
        list-style: none;
        display: flex;
        align-items: center;
        font-size: 18px;
        letter-spacing: 1.2px
    }
    
    .nav a{
        text-decoration: none;
        color: #ffffff;
        display: block;
        padding: 5px;
        transition: all 0.2s ease-in-out;
        -webkit-user-drag: none;
    }
    
    .nav a:hover{
        transition: all 0.2s ease-in-out;
        color: #aaaaaa;
        padding: 5px;
    }
    
    .nav li{
        margin-left: 25px;
        font-size: 1.5rem;
    }
    
    
    .nav ion-icon{
        display: block;
        align-items: center;
        color:#fff;
        cursor: pointer;
    }
    
    .nav #sun:hover{
        animation-name: sun;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: ease-in-out;
    }
    
    .nav #out
    {
        transition: 0.5s;
    }
    
    .nav #out:hover
    {
        transition: 0.5s;
        color: red;
    }
    
    @keyframes sun{
    
        20%{
            transform: rotate(0deg);
            color: #fff;
        }
    
        70%{
            transform: rotate(370deg);
            color: #fff;
        }
        100%
        {
            transform: scale(1.3);
            color: #ffd900;
        }
    }
    </style>
    
    
    
    
    
    
    
    
    
    
    
    <div class="header">
            <div class="logo_container">
                <h1>CV<span> Tech Team</span></h1>
            </div>
    
            ${locationToken}
            
            </div>
    `;
    return headerTemplate;
}

//construct the nav
class Header extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(createNavElement().content);

        // Highlight current tab
        var allTabs = document
            .querySelector("header-component")
            .shadowRoot.querySelectorAll("li");

        for (var i = 0; i < allTabs.length; i++) {
            if (location.href.includes(allTabs[i].textContent.toLowerCase())) {
                var innerContent = `${allTabs[i].innerHTML.substring(
                    0,
                    2
                )} style="color:black;"${allTabs[i].innerHTML.substring(2)}`;
                allTabs[i].innerHTML = innerContent;
                break;
            }
        }
    }
}
customElements.define("header-component", Header);

//sign out
function signOutUser() {
    try {
        const out = document
            .querySelector("header-component")
            .shadowRoot.querySelector("#out");
        out.addEventListener("click", function () {
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    alert("Sign out confirmed!");
                })
                .catch((error) => {
                    // An error happened.
                });
        });
    } catch (error) {}
}

signOutUser();
