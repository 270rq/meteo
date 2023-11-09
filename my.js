var map;
var city;

async function search(query) {
  // Очищаем результаты поиска
  console.log(query);
  document.getElementById('searchRes').innerHTML = '';
  console.log("search");

  // Получаем данные о городах
  if (!city) {
    city = await getCity();
  }
  console.log(city);
  // Фильтруем массив по введенному запросу
  const filteredData = city.filter(item => item.city.toLowerCase().includes(query.toLowerCase()));

  // Отображаем результаты поиска
  filteredData.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.city + " " + item.region;
    document.getElementById('searchRes').appendChild(li);
  });
}
async function getMenudata(Day, City, Region) {
  const response = await fetch(`https://localhost:7024/WeatherDay?Day=${Day}&City=${City}&Region=${Region}`, {
    mode: 'cors',
  });

  const data = await response.json();
  return data;
}

async function getCity() {
  const response = await fetch(`https://localhost:7024/city`, {
    mode: 'cors',
  });

  const data = await response.json();
  return data;
}

async function getFlower(Family) {

  const response = await fetch(`https://localhost:7024/plants?Family=${Family}`, {
    mode: 'cors',

  });

  const data = await response.json();
  return data;
}
let flowersWithFamyly = {};
async function changeFlowerSelect() {
  const selectFamily = document.getElementById('famSel');
  console.log(selectFamily.value);
  console.log(flowersWithFamyly);
  const flowers = flowersWithFamyly[selectFamily.value];
  console.log(flowers);

  const selectFlower = document.getElementById('flowerSelect');
  selectFlower.innerHTML = "";
  flowers.forEach((familyName) => {
    const option = document.createElement('option');
    option.value = familyName;
    option.text = familyName;
    selectFlower.appendChild(option);
  });

}
function generateColorsArray(numberOfColors) {
  var colors = [];
  var minDistance = 128; // Минимальное расстояние между цветами
  for (var i = 0; i < numberOfColors; i++) {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var newColor = "rgb(" + red + "," + green + "," + blue + ")";
    // Проверяем, что новый цвет достаточно отличается от предыдущих
    if (i > 0) {
      var distance = colorDistance(newColor, colors[i - 1]);
      if (distance < minDistance) {
        i--; // Генерируем новый цвет
        continue;
      }
    }
    colors.push(newColor);
  }
  return colors;
}

// Функция для вычисления расстояния между двумя цветами
function colorDistance(color1, color2) {
  var r1 = parseInt(color1.substr(4, 3));
  var g1 = parseInt(color1.substr(9, 3));
  var b1 = parseInt(color1.substr(14, 3));
  var r2 = parseInt(color2.substr(4, 3));
  var g2 = parseInt(color2.substr(9, 3));
  var b2 = parseInt(color2.substr(14, 3));
  return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}
async function getFamily() {
  const response = await fetch(`https://localhost:7024/Family`, {
    mode: 'cors',

  });

  const data = await response.json();
  return data;
}

async function getWeatherWeek(Day, City, Region) {
  const response = await fetch(`https://localhost:7024/WeatherWeak?Day=${Day}&City=${City}&Region=${Region}`, {
    mode: 'cors',
  });

  const data = await response.json();
  return data;
}

async function changedata() {
  const currentDate = new Date();
  const dateStr = currentDate.toString().split(':').slice(0, 2).join(':');
  console.log(`Current date: ${dateStr}`);
  console.log(YMaps.location);
  let City = '';
  let Region = '';
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  if (YMaps.location) // Проверяем, доступна ли геопозиция
  {

    document.getElementById("geo-now").innerText = YMaps.location.country + ", " + YMaps.location.city;
    City = YMaps.location.city;
    Region = YMaps.location.region;
  }
  else {
    alert("Пожалуйста, разрешите доступ к использованию Вашей геопозиции!");
  }
  console.log(YMaps.location)
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);
  document.getElementById("date-now").innerText = dateStr;


  map = L.map('map').setView([58, 49], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
  const dbDate = await getMenudata(formattedDate, City, Region);
  console.log(dbDate);
  var data = [
    { x: 50, y: 30 },
    { x: 150, y: 50 },
    { x: 250, y: 350 },
    { x: 350, y: 100 }
  ];

  var line = d3.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .curve(d3.curveBasis);

  d3.select("#bezier")
    .append("path")
    .datum(data)
    .attr("d", line);
  let closestTimestamp = Infinity;
  let closestIndex = 0;
  // Проходимся по всем датам и находим ближайшую
  dbDate.findIndex(function (date, index) {
    let dateTimestamp = new Date(date.day).getTime();
    let difference = Math.abs(currentDate.getTime() - dateTimestamp);
    if (difference < closestTimestamp) {
      closestTimestamp = difference;
      closestDateTime = date.day;
      closestIndex = index;
    }
  });

  function updateWeatherIcon(temperature, precipitation, visibility, uvIndex, windSpeed, windDirection) {//Смена иконки
    let iconPath = "weather 3d/01_sunny_color.svg"; // Иконка по умолчанию

    if (temperature > 25 && precipitation < 50) {
      iconPath = "weather 3d/01_sunny_color.svg"; // Ясная погода
    } else if (temperature < 10 && visibility < 500) {
      iconPath = "weather 3d/22_snow_color.svg"; // Снегопад
    } else if (precipitation > 80) {
      iconPath = "weather 3d/11_heavy_rain_color.svg"; // Дождь
    } else if (uvIndex > 8) {
      iconPath = "weather 3d/06_sunny_with_high_uv_color.svg"; // Высокий уровень УФ-индекса
    } else if (windSpeed > 30) {
      iconPath = "weather 3d/17_windy_color.svg"; // Ветрено
    } else if (windDirection === "north") {
      iconPath = "weather 3d/15_north_wind_color.svg"; // Северный ветер
    }

    const weatherIcon = document.getElementById("weather-icon-image");
    weatherIcon.src = iconPath;
  }
  try {


    // Пример вызова функции с определенными значениями:
    updateWeatherIcon(dbDate[closestIndex].temperatureC, dbDate[closestIndex].precipitation, dbDate[closestIndex].visibility, dbDate[closestIndex].uvIndex, dbDate[closestIndex].speedWind, dbDate[closestIndex].windDirection);

    document.getElementById("temp-now").innerText = dbDate[closestIndex].temperatureC.toString() + "°C"
    document.getElementById("wind_speed-now").innerHTML = dbDate[closestIndex].speedWind.toString() + " <p class='dop-txt'>km/h</p>"
    document.getElementById("wet-now").innerHTML = dbDate[closestIndex].precipitation.toString() + "<p class='dop-txt'> %</p>"
    document.getElementById("dewPoint-now").innerHTML = "Точка росы: " + dbDate[closestIndex].dewPoint.toString()
    document.getElementById("visi-now").innerHTML = dbDate[closestIndex].visibility.toString() + "<p class='dop-txt'> km</p>"
    document.getElementById("uv-now").innerHTML = dbDate[closestIndex].uvIndex.toString() + "<p class='dop-txt'> uv</p>"
    document.getElementById("sunrise-now").innerHTML = dbDate[closestIndex].sunrise.toString()
    document.getElementById("sunset-now").innerHTML = dbDate[closestIndex].sunset.toString()
    document.getElementById("feel-now").innerHTML = dbDate[closestIndex].weatherSensation.toString()
  }
  catch {
    console.log("no data")
  }
  const selectFamily = document.getElementById('famSel');
  const family = await getFamily(); // предполагается, что функция getFamily() возвращает массив строк

  const promises = family.map(async (familyName) => {
    const option = document.createElement('option');
    const flowersData = await getFlower(familyName);
    flowersWithFamyly[familyName] = flowersData;
    option.value = familyName;
    option.text = familyName;
    selectFamily.appendChild(option);
  });

  await Promise.all(promises);

  let id = localStorage.getItem("id");
  if (id) {
    changeFlowerSelectOnUser(id);
  }
  else {
    changeFlowerSelect();
  }


}
async function changeFlowerSelectOnUser(id) {
  let selFam = document.getElementById("famSel");
  let selFlow = document.getElementById("flowerSelect");
  const response = await fetch(`https://localhost:7024/user/loginReg/allerg?id=${id}`, {
    mode: 'cors',
  });
  if (response.status == 200) {
    const data = await response.text();
    if (data != "not found" && data != null && data.length > 0) {
      let family;
      for (var fam in flowersWithFamyly){
        let flowers = flowersWithFamyly[fam];
        if (flowers.includes(data)){
          family = fam;
          break;
        }
        
      }
      let selectedIndex = Array.from(selFam.options).findIndex(option => option.value === family);
      selFam.selectedIndex = selectedIndex;
      await changeFlowerSelect()
      selectedIndex = Array.from(selFlow.options).findIndex(option => option.value === data);
      selFlow.selectedIndex = selectedIndex;
    }
  }
}
async function getMapDate() {
  var sel = document.getElementById('flowerSelect').value;
  if (sel != null) {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    let currentMonth = monthNames[parseInt(month) - 1]
    const dateStr = currentDate.toString().split(':').slice(0, 2).join(':');
    var x = YMaps.location.latitude.toString().replace(",", ".").slice(0, 7);
    var y = YMaps.location.longitude.toString().replace(",", ".").slice(0, 7);
    let url = `https://localhost:7024/Map?month=${currentMonth}&Name_flower=${sel}&X=${x}&Y=${y}`.replace(',', '.');
    const response = await fetch(url, {
      mode: 'cors',

    });
    console.log(response);
    const data = await response.json();
    console.log(data)
    data.forEach(function (el) {
      var mark = L.marker([el.x, el.y]).addTo(map);

      // Добавляем всплывающую подсказку для маркеров
      mark.bindPopup("Маркер 1");
    })
  }


}

