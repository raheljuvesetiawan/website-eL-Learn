const namaTutorial = [
    "HTML Dasar",
    "CSS Dasar",
    "JavaScript Dasar",
    "DOM Manipulation",
    "Event Handling",
    "Fetch API",
    "Async/Await",
    "Local Storage",
    "Session Storage",
    "Web APIs"
];

const tutorialLinks = {
    "html dasar": "/Pengenalan HTML/index.html",
    "css dasar": "/Pengenalan CSS/index.html",
    "javascript dasar": "/Pengenalan JavaScript/index.html",
    "dom manipulation": "/DOM/index.html",
    "event handling": "/Event/index.html",
    "fetch api": "/FetchAPI/index.html",
    "async/await": "/AsyncAwait/index.html",
    "local storage": "/LocalStorage/index.html",
    "session storage": "/SessionStorage/index.html",
    "web apis": "/WebAPIs/index.html"
};

// Ambil elemen input dan list UL
const input = document.getElementById("searchInput");
const list = document.getElementById("tutorialList");
const searchButton = document.getElementById("searchButton");

// Tampilkan semua tutorial sebagai <li>
function tampilkanTutorial(arr) {
    list.innerHTML = "";
    arr.forEach(nama => {
        const li = document.createElement("li");
        li.textContent = nama;
        li.style.cursor = "pointer";
        li.onclick = function() {
            input.value = nama;
            list.innerHTML = "";
        };
        list.appendChild(li);
    });
}

// Inisialisasi tampilan awal
tampilkanTutorial(namaTutorial);

// Fungsi pencarian dan redirect
function cariTutorial() {
    const namaDicari = input.value.trim().toLowerCase();
    if (tutorialLinks[namaDicari]) {
        window.location.href = tutorialLinks[namaDicari];
    } else {
        // Auto koreksi: cari yang paling mirip
        const kemungkinan = namaTutorial.find(nama => 
            nama.toLowerCase().includes(namaDicari)
        );
        if (kemungkinan) {
            input.value = kemungkinan;
            list.innerHTML = "";
            alert(`Mungkin maksud Anda: "${kemungkinan}"`);
        } else {
            alert("Tutorial tidak ditemukan!");
        }
    }
}

// Saat user mengetik, tampilkan suggestion
input.addEventListener("input", function () {
    const filter = input.value.toLowerCase();
    if (filter === "") {
        tampilkanTutorial(namaTutorial);
        return;
    }
    const hasil = namaTutorial.filter(nama => nama.toLowerCase().includes(filter));
    tampilkanTutorial(hasil);
});

// Enter untuk cari
input.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        cariTutorial();
    }
});

// Klik tombol cari
searchButton.addEventListener("click", function () {
    cariTutorial();
});



// Script sederhana untuk interaktivitas
document.addEventListener('DOMContentLoaded', function() {
    // Tombol CTA scroll ke tutorial section
    const ctaButton = document.querySelector('.cta-button');
    const tutorialsSection = document.getElementById('tutorials');
    
    if (ctaButton && tutorialsSection) {
        ctaButton.addEventListener('click', function() {
            tutorialsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    // Tombol belajar pada setiap card
    const learnButtons = document.querySelectorAll('.learn-button');
    learnButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.tutorial-card');
            const stepTitle = card.querySelector('h3').textContent;
            alert(`Anda akan mempelajari: ${stepTitle}`);
        });
    });
});
