import { COUNTRIES_API } from "./constants.js";

const countriesSelect = document.getElementById("countries");
const dialCode = document.getElementById("dialCode");

const fetchDialCode = async (countryName) => {
    try {
        const res = await fetch(`
${COUNTRIES_API}/name/${countryName}?fullText=true&fields=idd`);
        const data = await res.json();
        const { root, suffixes } = data[0].idd;
        const code = root + suffixes[0];
        dialCode.textContent = code;
    } catch (err) {
        console.error(err);
    }
};

countriesSelect.addEventListener("change", (e) => {
    const countryName = e.target.value;
    fetchDialCode(countryName);
});
