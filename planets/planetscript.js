let currentPageUrl = 'https://swapi.tech/api/planets/'
const stars = 1200;

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl);
        for (let i = 0; i < stars; i++) {
            let star = document.createElement("div");
            star.className = 'stars';
            let xy = randomPosition();
            star.style.top = xy[0] + 'px';
            star.style.left = xy[1] + 'px';
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
                        name.innerText = `Nome: ${details.name}`;
        
                        const diameter = document.createElement("span");
                        diameter.className = "planet-details";
                        diameter.innerText = `Diametro: ${details.diameter}`;
        
                        const gravity = document.createElement("span");
                        gravity.className = "planet-details";
                        gravity.innerText = `Gravidade: ${convertGravity(details.gravity)}`;
                        console.log(gravity)
        
                        const population = document.createElement("span");
                        population.className = "planet-details";
                        population.innerText = `Populacao: ${details.population}`;
        
                        const climate = document.createElement("span");
                        climate.className = "planet-details";
                        climate.innerText = `Clima: ${details.climate}`;
        
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
        alert('Erro ao carregar os personagens');
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

function convertGravity(gravity) {
    const gravidade = {
        standard: "padrao",
        surface: 'superficie'
    };

    const gravityType = gravity.split(" ")[1];
    const portugueseType = gravidade[gravityType];

    const gravityNumber = gravity.split(" ")[0];
    console.log(gravity)

    return (`${gravityNumber} ${portugueseType}`).toLowerCase() || gravity;
}