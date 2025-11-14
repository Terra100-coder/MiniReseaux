import { $, $all, DEFAULT_AVATAR } from "./utils.js";

let users = [];

const cardsContainer = $("#cardsContainer");
const loader = $("#loader");
const errorBox = $("#error");
const noResultsBox = $("#noResults");

const searchInput = $("#searchInput");
const citySelect = $("#citySelect");
const interestsContainer = $("#interestsContainer");

async function loadUsers() {
  try {
    loader.style.display = "block";

    const response = await fetch("data/users.json");
    users = await response.json();

    loader.style.display = "none";

    initFilters(users);
    displayUsers(users);
  } catch (error) {
    console.log(error);
    loader.style.display = "none";
    errorBox.hidden = false;
  }
}

function displayUsers(list) {
  cardsContainer.innerHTML = "";

  if (list.length === 0) {
    noResultsBox.hidden = false;
    return;
  } else {
    noResultsBox.hidden = true;
  }

  list.forEach((user) => {
    const avatar =
      user.avatar && user.avatar.trim() !== "" ? user.avatar : DEFAULT_AVATAR;

    const card = document.createElement("a");
    card.className = "card";
    card.href = `profile.html?id=${user.id}`;

    card.innerHTML = `
            <img src="${avatar}" alt="${user.name}">
            <div>
                <h3>${user.name}</h3>
                <div class="muted">${user.age} ans · ${user.location}</div>
                <div>
                    ${user.interests
                      .slice(0, 3)
                      .map((i) => `<span class="tag">${i}</span>`)
                      .join("")}
                </div>
            </div>
        `;

    cardsContainer.appendChild(card);
  });
}

function initFilters(usersList) {
  const cities = [...new Set(usersList.map((u) => u.location))];

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });

  const interestsSet = new Set();
  usersList.forEach((u) => u.interests.forEach((i) => interestsSet.add(i)));

  interestsSet.forEach((interest) => {
    const label = document.createElement("label");

    label.innerHTML = `
            <input type="checkbox" value="${interest}"> ${interest}
        `;

    interestsContainer.appendChild(label);
  });

  searchInput.addEventListener("input", applyFilters);
  citySelect.addEventListener("change", applyFilters);
  $all("#interestsContainer input").forEach((cb) => {
    cb.addEventListener("change", applyFilters);
  });
}

function applyFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCity = citySelect.value;
  const selectedInterests = [...$all("#interestsContainer input:checked")].map(
    (i) => i.value
  );

  const filtered = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(searchText);

    const matchesCity = selectedCity === "" || user.location === selectedCity;

    const matchesInterests =
      selectedInterests.length === 0 ||
      selectedInterests.every((i) => user.interests.includes(i));

    return matchesName && matchesCity && matchesInterests;
  });

  displayUsers(filtered);
}

loadUsers();
