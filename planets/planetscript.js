let currentPageUrl = 'https://swapi.tech/api/planets/'
const stars = 1200;

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl);
        for (let i = 0; i < stars; i++) {
            let star = document.createElement("div");
            star.className = 'stars';
            let [x, y] = randomPosition();
            star.style.top = x + 'px';
            star.style.left = y + 'px';
            document.body.append(star);
        }
        
        function randomPosition () {
            let y = window.document.body.clientWidth;
            let x = window.document.body.clientHeight;
            let randomX = Math.floor(Math.random() * x);
            let randomY = Math.floor(Math.random() * y);
        
            return [randomX, randomY];
        }
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
};

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planet) => {
            const card = document.createElement("div");
            card.style.backgroundImage =
            `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const planetNameBG = document.createElement("div");
            planetNameBG.className = "planet-name-bg";

            const planetName = document.createElement("span");
            planetName.className = "planet-name";
            planetName.innerText = `${planet.name}`;

            planetNameBG.appendChild(planetName);
            card.appendChild(planetNameBG);

            card.onclick = async () => {

                    try {
                        const response = await fetch(planet.url);
                        const responseJson = await response.json();

                        const details = responseJson.result.properties;

                        const modal = document.getElementById("modal");
                        modal.style.visibility = "visible";
        
                        const modalContent = document.getElementById("modal-content");
                        modalContent.innerHTML = '';
        
                        const planetImage = document.createElement("div");
                        planetImage.style.backgroundImage =
                        `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`;
                        planetImage.className = "planet-image";
        
                        const name = document.createElement("span");
                        name.className = "planet-details";
                        name.innerText = `Nome: ${convertName(details.name)}`;
        
                        const diameter = document.createElement("span");
                        diameter.className = "planet-details";
                        diameter.innerText = `Diametro: ${convertDiameter(details.diameter)}`;
        
                        const gravity = document.createElement("span");
                        gravity.className = "planet-details";
                        gravity.innerText = `Gravidade: ${convertGravity(details.gravity)}`;
        
                        const population = document.createElement("span");
                        population.className = "planet-details";
                        population.innerText = `Populacao: ${convertPopulation(details.population)}`;
        
                        const climate = document.createElement("span");
                        climate.className = "planet-details";
                        climate.innerText = `Clima: ${convertClimate(details.climate)}`;
        
                        modalContent.appendChild(planetImage);
                        modalContent.appendChild(name);
                        modalContent.appendChild(diameter);
                        modalContent.appendChild(gravity);
                        modalContent.appendChild(population);
                        modalContent.appendChild(climate);

                    } catch(error) {
                        console.log(error);
                        alert('Erro ao carregar dados do planeta')
                    }
            }

            mainContent.appendChild(card);
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        nextButton.style.visibility = responseJson.next ? "visible" : "hidden";

        currentPageUrl = url;

    } catch(error) {
        alert('Erro ao carregar os planetas');
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadPlanets(responseJson.next);

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a próxima página');
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadPlanets(responseJson.previous);

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}

function convertName(name) {
    if (name === "unknown") {
        return "desconhecido";
    }

    return name;
}

function convertDiameter(diameter) {
    if (diameter === "unknown") {
        return "desconhecido";
    }

    return diameter;
}

function convertGravity(gravity) {
    const gravidade = {
        standard: "padrao",
        surface: "superficie",
        '(surface),': "(superficie),",
        unknown: "desconhecida",
        'N/A': 'inexistente'
    };

    return (gravity ?? "")
        .trim()
        .split(" ")
        .map(e => gravidade[e] ?? e)
        .join(" ")
}

function convertPopulation(population) {
    if (population === "unknown") {
        return "desconhecido";
    }

    return population;
}

function convertClimate(climate) {
    const climas = {
        arid: "arido",
        temperate: "temperado",
        frozen: "congelado",
        murky: "turvo",
        windy: "ventoso",
        hot: "quente",
        frigid: "frigido",
        humid: "umido",
        unknown: "desconhecido",
        polluted: "poluido",
        superheated: "superaquecido",
        subartic: "subartico",
        artic: "artico",
        rocky: "pedregoso",
        moist: "umido"
    }

    if (climate.includes(",")) {
        return climate
            .trim()
            .split(",")
            .map(e => climas[e.trim()] ?? e.trim())
            .join(", ")
    }
    
    if (climate.includes(" ")) {
        return climate
            .trim()
            .split(" ")
            .map(e => climas[e.trim()] ?? e.trim())
            .join(" ")
    }

    return (climas[climate] ?? climate)
    }