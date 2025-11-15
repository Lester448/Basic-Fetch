// --- element references ---
const housesSection = document.querySelector('#houses');
const colorNameEl   = document.querySelector('#colorName');
const newColorBtn   = document.querySelector('#newColorBtn');

// --URL-
const housesUrl   = 'houses.json';
const colorApiUrl = 'https://www.thecolorapi.com/random?format=json';

// --- fetch houses ---
function renderHouses(houses) {
  // Create the description list container
  const dl = document.createElement('dl');
  dl.className = 'houses-list';

  houses.forEach(house => {
    const dt = document.createElement('dt');
    dt.className = 'house';
    const nameText = document.createTextNode(house.name);
    dt.appendChild(nameText);
    const codeBadge = document.createElement('span');
    codeBadge.className = 'house__code';
    codeBadge.textContent = house.code;
    dt.appendChild(codeBadge);
    const dd = document.createElement('dd');
    dd.className = 'house__members';
    const label = document.createElement('span');
    label.className = 'house__label';
    label.textContent = 'Members: ';
    dd.appendChild(label);
    const list = document.createElement('ul');
    list.className = 'house__members-list';
    house.members.forEach(memberName => {
      const li = document.createElement('li');
      li.className = 'house__member';
      li.textContent = memberName;
      list.appendChild(li);
    });

    dd.appendChild(list);
    dl.appendChild(dt);
    dl.appendChild(dd);
  });

  housesSection.innerHTML = '';
  housesSection.appendChild(dl);
}

function fetchHouses() {
  fetch(housesUrl)
    .then(response => response.json())
    .then(data => {
      renderHouses(data);
    })
    .catch(err => {
      console.error('Error fetching houses:', err);
      housesSection.textContent = 'Oops, could not load the houses.';
    });
}
// --- random color API for background -----
function applyColor(data) {
  const hex  = data.hex.value;    
  const name = data.name.value;  
  document.body.style.backgroundColor = hex;
  if (colorNameEl) {
    colorNameEl.textContent = `Background: ${name} (${hex})`;
  }
}

function fetchRandomColor() {
  fetch(colorApiUrl)
    .then(response => response.json())
    .then(data => {
      applyColor(data);
    })
    .catch(err => {
      console.error('Error fetching color:', err);
    });
}
// --- init on page load --
document.addEventListener('DOMContentLoaded', () => {
  fetchHouses();      
  fetchRandomColor(); 
  if (newColorBtn) {
    newColorBtn.addEventListener('click', fetchRandomColor);
  }
});
