async function getAllergen() {
    let id = localStorage.getItem("id");
    if (id) {

        let sel = document.getElementById("selAllerg");
        const response = await fetch(`https://localhost:7024/user/loginReg/allerg?id=${id}`, {
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
    const response = await fetch(`https://localhost:7024/allPlants`, {
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
        const response = await fetch(`https://localhost:7024/user/loginReg/allerg?flower=${sel.value}&id=${id}`, {
            method: 'POST',
            mode: 'cors'
        });
    }
    window.location.href = "http://127.0.0.1:5500/main.html";
}

