import { languages } from "./form-translations.js";

(function () {
  const formContact = document.querySelector(".js-form-contact");

  if (formContact) {
    const formInputs = formContact.querySelectorAll("input, textarea");
    const formAlert = formContact.querySelector(".js-form-contact-alert");
    const formSuccess = formContact.querySelector(".js-form-contact-success");
    const formAlertText = formAlert.querySelector(".js-message");
    const formSuccessText = formSuccess.querySelector(".js-message");
    const formButtomSubmit = formContact.querySelector(".js-form-submit");
    formContact.addEventListener(
      "click",
      (event) => {
        const elements = formContact.querySelectorAll(".js-btn-close");
        const path = event.composedPath();
        path.forEach((node) => {
          elements.forEach((elem) => {
            if (node === elem) {
              elem.parentElement.classList.remove("show");
              elem.parentElement.classList.add("hidden");
            }
          });
        });
      },
      true
    );
    formButtomSubmit.addEventListener(
      "click",
      () => {
        formInputs.forEach((formInput) => {
          formInput.classList.add("js-form-item");
        });
      },
      false
    );
    formContact.addEventListener(
      "submit",
      (event) => {
        const lang = document.documentElement.lang;
        event.preventDefault();
        formInputs.forEach((formInput) => {
          formInput.classList.add("js-form-item");
        });
        const data = new FormData(formContact);
        fetch("./send-contact.php", {
          method: "POST",
          body: data,
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (response) {
            if (response.estado === 500) {
              throw languages[lang][response["mensaje_estado"]];
            }
            formContact.reset();
            formAlert.classList.remove("show");
            formAlert.classList.add("hidden");
            formSuccess.classList.remove("hidden");
            formSuccessText.textContent = languages[lang].Sucess;
            formSuccess.classList.add("show");
            grecaptcha.reset();
            formInputs.forEach((formInput) => {
              formInput.classList.remove("js-form-item");
            });
          })
          .catch(function (err) {
            console.log(err);
            formAlert.classList.remove("hidden");
            formAlert.classList.add("show");
            formSuccess.classList.remove("show");
            formAlertText.textContent = err;
            formSuccess.classList.add("hidden");
          });
      },
      false
    );
  }
})(languages);
