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
        const res = await fetch(`${COUNTRIES_API}/all?fields=name`);
        const data = await res.json();
        const orderedData = data.sort((a, b) =>
            a.name.common < b.name.common ? -1 : 1
        );
        displayCountries(orderedData);
    } catch (err) {
        console.error(err);
    }
};

document.addEventListener("DOMContentLoaded", fetchCountries);
