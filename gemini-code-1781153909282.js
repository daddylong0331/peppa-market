// Sample Cups Data (From different countries)
const defaultCups = [
    { name: "Traditional Matcha Bowl", origin: "Japan", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500" },
    { name: "Vintage Porcelain Teacup", origin: "United Kingdom", img: "https://images.unsplash.com/photo-1567006339861-30d0b2d4560d?w=500" },
    { name: "Clay Matte Mug", origin: "Mexico", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500" }
];

// Initialize LocalStorage for cups if empty
if (!localStorage.getItem('cups')) {
    localStorage.setItem('cups', JSON.stringify(defaultCups));
}

let authMode = 'login';

function switchAuthMode(mode) {
    authMode = mode;
    document.getElementById('tab-login').className = mode === 'login' ? 'active' : '';
    document.getElementById('tab-register').className = mode === 'register' ? 'active' : '';
    document.getElementById('auth-btn').innerText = mode === 'login' ? 'Log In' : 'Register';
}

function handleAuth(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const identity = document.getElementById('identity').value;

    // Simulation: accept any login/registration for testing
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('user-greeting').innerText = `Logged in as: ${username} (${identity})`;

    // Show the view corresponding to the logged-in identity
    document.getElementById(`${identity}-view`).classList.remove('hidden');

    if (identity === 'customer') {
        renderCups();
    }
}

function renderCups() {
    const cupList = document.getElementById('cup-list');
    cupList.innerHTML = '';
    const cups = JSON.parse(localStorage.getItem('cups'));

    cups.forEach(cup => {
        cupList.innerHTML += `
            <div class="cup-item">
                <img src="${cup.img}" alt="${cup.name}">
                <h3>${cup.name}</h3>
                <p><strong>Origin:</strong> ${cup.origin}</p>
                <button onclick="alert('You bought the ${cup.name}!')">Buy</button>
            </div>
        `;
    });
}

function addCup(event) {
    event.preventDefault();
    const name = document.getElementById('cup-name').value;
    const origin = document.getElementById('cup-origin').value;
    const img = document.getElementById('cup-img').value;

    const cups = JSON.parse(localStorage.getItem('cups'));
    cups.push({ name, origin, img });
    localStorage.setItem('cups', JSON.stringify(cups));

    alert('Cup added successfully! Log in as Customer to see it.');
    document.getElementById('retailer-form').reset();
}

function logout() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('customer-view').classList.add('hidden');
    document.getElementById('retailer-view').classList.add('hidden');
    document.getElementById('administrator-view').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
}