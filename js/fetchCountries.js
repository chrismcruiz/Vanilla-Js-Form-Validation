import { COUNTRIES_API } from "./constants.js";

const countriesSelect = document.getElementById("countries");

const displayCountries = (countries) => {
    const fragment = document.createDocumentFragment();
    countries.forEach((country) => {
        const option = document.createElement("OPTION");
        option.textContent = country.name.common;
        fragment.appendChild(option);
    });
    countriesSelect.appendChild(fragment);
};

const fetchCountries = async () => {
    try {
        const res = await fetch(COUNTRIES_API);
        const data = await res.json();
        displayCountries(data);
    } catch (err) {
        console.error(err);
    }
};

document.addEventListener("DOMContentLoaded", fetchCountries);
