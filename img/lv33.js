document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".login");
    const signUpButton = document.querySelector(".signup");
    const languageSelect = document.querySelector(".language-selector select");

    loginButton.addEventListener("click", function () {
        alert("Login button clicked!");
    });

    signUpButton.addEventListener("click", function () {
        alert("Sign-up button clicked!");
    });

    languageSelect.addEventListener("change", function () {
        alert("Language changed to: " + this.value);
    });
});
