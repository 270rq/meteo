const lat = 58.60599400153405; // Широта
const lon = 49.65685585925846; // Долгота
fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });