const serverUrl = 'https://7a45-178-141-169-11.ngrok-free.app';
async function getAllergen() {
    let id = localStorage.getItem("id");
    if (id) {

        let sel = document.getElementById("selAllerg");
        const response = await fetch(`${serverUrl}/user/loginReg/allerg?id=${id}`, {
            mode: 'cors',
        });
        if (response.status == 200) {
            const data = await response.text();
            if (data != "not found" && data != null && data.length > 0) {
                let selectedIndex = Array.from(sel.options).findIndex(option => option.value === data);
                sel.selectedIndex = selectedIndex;
            }
        }

    }
}
async function putAllergInSelect() {
    let sel = document.getElementById("selAllerg");
    const response = await fetch(`${serverUrl}/allPlants`, {
        mode: 'cors',
    });

    const data = await response.json();
    data.forEach(plant => {
        let option = document.createElement("option");
        option.innerHTML = plant;
        option.className = "plantOption";
        sel.appendChild(option);
    });
    getAllergen();
}
async function updateAllergen() {
    let id = localStorage.getItem("id");
    if (id) {
        let sel = document.getElementById("selAllerg");
        const response = await fetch(`${serverUrl}/user/loginReg/allerg?flower=${sel.value}&id=${id}`, {
            method: 'POST',
            mode: 'cors'
        });
    }
    window.location.href = "index.html";
}

