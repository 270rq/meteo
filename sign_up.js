const avatarInput = document.getElementById("avatar-input");
const avatarImage = document.getElementById("avatar");

avatarInput.addEventListener("change", function () {
    const file = avatarInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            avatarImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});