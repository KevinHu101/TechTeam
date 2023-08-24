// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    connectAuthEmulator,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { firebaseConfig } from "./Firebase.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig());

const db = getFirestore(app);
const auth = getAuth(app);
const user = auth.currentUser;


var arrLeft = document.querySelector("#arrLeft");
var arrRight = document.querySelector("#arrRight");
var slider = document.querySelector(".slider-inner");


arrLeft.addEventListener("click", function () {
    slider.scrollBy(-1000000, 0);
});
arrRight.addEventListener("click", function () {
    slider.scrollBy(1000000, 0);
});



// autoScroll()


function autoScroll() {
    var allImg = document.querySelector(".slider-inner").querySelectorAll('img')
    var delayTime = 1000
    console.log(allImg.length)

    setTimeout(() => {
        function scrollNext(i) {
            setTimeout(function() {
                document.querySelector(".slider-inner").scrollBy(1000000, 0);
                console.log(allImg[allImg.length-1])
            }, delayTime * i);
        }

        function scrollBack(i) {
            setTimeout(function() {
                document.querySelector(".slider-inner").scrollBy(-1000000, 0);
                console.log(allImg[allImg.length-1])
            }, delayTime * i);
        }


                for (var i=0; i<allImg.length-1; i++) {  
                        scrollNext(i)
                        }

                // for (var i=0; i<allImg.length-1; i++) {  
                //     console.log("scrollback")
                //     scrollBack(i)
                //     }
    }, delayTime);

    
    
}