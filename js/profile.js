import { $, DEFAULT_AVATAR } from "./utils.js";

const profileContainer = $("#profileContainer");
const loader = $("#loader");
const errorBox = $("#error");
const profileContent = $("#profileContent");

const profileAvatar = $("#profileAvatar");
const profileName = $("#profileName");
const profileDetails = $("#profileDetails");
const profileBio = $("#profileBio");
const profileInterests = $("#profileInterests");

const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

async function loadProfile() {
  loader.style.display = "block";
  errorBox.hidden = true;
  profileContent.hidden = true;

  try {
    const response = await fetch("./data/users.json");
    if (!response.ok) throw new Error("Impossible de charger le JSON");
    const users = await response.json();

    const user = users.find((u) => u.id == userId);

    loader.style.display = "none";

    if (!user) {
      errorBox.hidden = false;
      return;
    }

    displayProfile(user);
  } catch (error) {
    console.error(error);
    loader.style.display = "none";
    errorBox.hidden = false;
  }
}

function displayProfile(user) {
  profileContent.hidden = false;

  profileAvatar.src =
    user.avatar && user.avatar.trim() !== "" ? user.avatar : DEFAULT_AVATAR;
  profileAvatar.alt = user.name;

  profileName.textContent = user.name;
  profileDetails.textContent = `${user.age} ans · ${user.location}`;

  profileBio.textContent = user.bio ? user.bio : "Pas de bio disponible.";

  profileInterests.innerHTML = "";
  user.interests.forEach((i) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = i;
    profileInterests.appendChild(span);
  });
}

loadProfile();
