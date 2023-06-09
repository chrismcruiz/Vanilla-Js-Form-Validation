import { URLRegex, emailRegex, phoneNumberRegex } from "./regex.js";
import { calculateAge } from "./utils.js";

const form = document.getElementById("form");

const inputFields = {
  firstName: document.getElementById("firstname"),
  lastName: document.getElementById("lastname"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmPass: document.getElementById("confirm_pass"),
  country: document.getElementById("countries"),
  phoneNumber: document.getElementById("phone"),
  birthdate: document.getElementById("birthdate"),
  url: document.getElementById("url"),
  terms: document.getElementById("terms"),
};

const dialCode = document.getElementById("dialCode");
const resetFormButton = document.getElementById("resetForm");
const errors = form.querySelectorAll(".form__error");
const inputs = form.querySelectorAll(".form__input");

const formIsValid = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPass: false,
  country: false,
  phoneNumber: false,
  birthdate: false,
  url: false,
  terms: false,
};

const toggleClasses = (input, error, isValid) => {
  input.classList.toggle("form__input--error", !isValid);
  input.classList.toggle("form__input--valid", isValid);
  error.classList.toggle("form__error--hidden", isValid);
};

const validateInput = (key) => {
  const input = inputFields[key];
  const error = input.closest(".form__field").nextElementSibling;

  const validationRules = {
    email: () =>
      emailRegex.test(input.value) || "Please enter a valid email address",
    password: () =>
      input.value.length >= 8 || "Password must be at least 8 characters",
    confirmPass: () =>
      input.value === inputFields.password.value || "Passwords do not match",
    phoneNumber: () => {
      if (!inputFields.country.value) return "Please select a country";
      return (
        phoneNumberRegex.test(input.value) ||
        "Please enter a valid phone number"
      );
    },
    birthdate: () =>
      calculateAge(input.value) >= 18 || "You must be 18 or older",
    url: () => URLRegex.test(input.value) || "Please enter a valid URL",
    terms: () => input.checked || "Please accept the terms and conditions",
  };

  if (input.value === "") {
    error.textContent = "Please fill out this field";
    toggleClasses(input, error, false);
    formIsValid[key] = false;
    return;
  }

  const validationFunction = validationRules[key] || (() => true);
  const isValid = validationFunction();
  const errorMessage = typeof isValid === "string" ? isValid : "";
  error.textContent = errorMessage;
  toggleClasses(input, error, errorMessage === "");
  formIsValid[key] = errorMessage === "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  Object.keys(inputFields).forEach((key) => validateInput(key));

  const validForm = Object.values(formIsValid).findIndex(
    (value) => value === false
  );

  if (validForm === -1) {
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);
    const formObj = {
      ...formProps,
      phone: `${dialCode.textContent}${formProps.phone}`,
    };
    console.log(formObj);
  }
});

resetFormButton.addEventListener("click", () => {
  errors.forEach((error) => error.classList.add("form__error--hidden"));
  inputs.forEach((input) => {
    console.log(input);
    input.classList.remove("form__input--error");
    input.classList.remove("form__input--valid");
  });
  form.reset();
});
