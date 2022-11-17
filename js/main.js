let elForm = document.querySelector(".form")
let elInput = document.querySelector(".input")
let elList = document.querySelector(".list")
let elTemplate = document.querySelector(".template").content;
let newFragment = document.createDocumentFragment()


async function list(city) {
    try {
        elList.innerHTML = "";

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4c74dfed0d76e6ea449fac9942ce0e5c&units=metric`)
        let data = await res.json();

        let templateClone = elTemplate.cloneNode(true);
        templateClone.querySelector(".tong").textContent = data.name;
        templateClone.querySelector(".times").textContent = Math.floor(data.main.temp);
        let local = data.coord.lat;
        let localLon = data.coord.lon;
        templateClone.querySelector(".location").href = `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=rain&lat=${local}&lon=${localLon}&zoom=15`;

        let weatherarr = await data.weather;

        weatherarr.forEach(element => {
            templateClone.querySelector(".event").textContent = element.main
            if (element.id > 800) {
                templateClone.querySelector(".cloud").src = "./images/Clouds.gif"
            } else if (element.id == 800) {
                templateClone.querySelector(".cloud").src = "./images/summer.gif"

            } else if (element.id >= 701 && element.id <= 781) {
                templateClone.querySelector(".cloud").src = "./images/mist.gif"

            } else if (element.id >= 600 && element.id <= 622) {
                templateClone.querySelector(".cloud").src = "./images/Snow.gif"

            } else if (element.id >= 500 && element.id <= 531) {
                templateClone.querySelector(".cloud").src = "./images/rain.gif"

            } else if (element.id >= 300 && element.id <= 321) {
                templateClone.querySelector(".cloud").src = "./images/drizzle.gif"

            } else if (element.id >= 200 && element.id <= 232) {
                templateClone.querySelector(".cloud").src = "./images/Thunderstorm.gif"

            }
        })

        newFragment.appendChild(templateClone)
        elList.appendChild(newFragment)
    } catch (error) {
        console.log(error);
    }
}


list("Tashkent")
list("London")
list("New York")
list("Paris")

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let elInputValue = elInput.value.trim();
    list(elInputValue)

    if (elInput.value == "") {
        list("Tashkent")
        list("London")
        list("New York")
        list("Paris")
    }

    elInput.value = "";
})

setTimeout(() => {
    window.location.reload();
}, 86400000);






let elTime = document.querySelector(".times")

function getDateTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();

    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    var dateTime = hour + ':' + minute;
    return dateTime;
}

setInterval(function () {
    currentTime = getDateTime();
    elTime.innerHTML = currentTime;
}, 1000);