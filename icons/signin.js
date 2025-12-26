// accountMenu.js

(function() {
    // --- CONFIGURE FIREBASE ---
    const firebaseConfig = {
        apiKey: "AIzaSyCSBdkISsFqfwCLloLRa1s1vuVpfrs1Q1M",
        authDomain: "bbird-89448.firebaseapp.com",
        projectId: "bbird-89448",
        storageBucket: "bbird-89448.firebasestorage.app",
        messagingSenderId: "765941536064",
        appId: "1:765941536064:web:156548f3586b85e9ed16a5",
        measurementId: "G-ZSBJPBKGVN"
      };
  
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
  
    // --- CREATE HTML ELEMENTS ---
    const container = document.createElement("div");
    container.id = "account-menu";
    container.style.position = "fixed";
    container.style.top = "10px";
    container.style.right = "10px";
    container.style.zIndex = "9999";
  
    container.innerHTML = `
      <img id="user-photo" src="https://www.gravatar.com/avatar/?d=mp" alt="Account" 
        style="width:40px; height:40px; border-radius:50%; cursor:pointer; border:2px solid #ccc;">
      <div id="dropdown" style="
        display:none; 
        position:absolute; 
        right:0; 
        background:white; 
        border:1px solid #ccc; 
        border-radius:5px; 
        margin-top:5px; 
        min-width:150px; 
        box-shadow:0 2px 6px rgba(0,0,0,0.2);
        overflow:hidden;">
        <button id="sign-in-btn" style="width:100%; padding:10px; border:none; background:none; cursor:pointer;">Sign In</button>
        <button id="sign-out-btn" style="width:100%; padding:10px; border:none; background:none; cursor:pointer; display:none;">Sign Out</button>
      </div>
    `;
  
    document.body.appendChild(container);
  
    // --- ELEMENT REFERENCES ---
    const userPhoto = document.getElementById("user-photo");
    const dropdown = document.getElementById("dropdown");
    const signInBtn = document.getElementById("sign-in-btn");
    const signOutBtn = document.getElementById("sign-out-btn");
  
    // Toggle dropdown
    userPhoto.addEventListener("click", () => {
      dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });
  
    // Sign In
    signInBtn.addEventListener("click", () => {
      auth.signInWithPopup(provider)
        .then(result => {
          updateUI(result.user);
          dropdown.style.display = "none";
        })
        .catch(console.error);
    });
  
    // Sign Out
    signOutBtn.addEventListener("click", () => {
      auth.signOut().then(() => {
        updateUI(null);
        dropdown.style.display = "none";
      });
    });
  
    // Update UI
    function updateUI(user) {
      if (user) {
        userPhoto.src = user.photoURL || "https://www.gravatar.com/avatar/?d=mp";
        signInBtn.style.display = "none";
        signOutBtn.style.display = "block";
      } else {
        userPhoto.src = "https://www.gravatar.com/avatar/?d=mp";
        signInBtn.style.display = "block";
        signOutBtn.style.display = "none";
      }
    }
  
    // Listen for auth changes
    auth.onAuthStateChanged(updateUI);
  
    // Close dropdown if click outside
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  
  })();
  