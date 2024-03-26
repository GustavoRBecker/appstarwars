let currentPageUrl = 'https://swapi.tech/api/starships/'
const stars = 1200;

window.onload = async () => {
    try {
        await loadShips(currentPageUrl);
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

async function loadShips(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    try {

        const response = await fetch(url);
        const responseJson = await response.json();
        console.log(responseJson)

        responseJson.results.forEach((ship) => {
            const card = document.createElement("div");
            card.style.backgroundImage =
            `url('https://starwars-visualguide.com/assets/img/starships/${ship.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const shipNameBG = document.createElement("div");
            shipNameBG.className = "ship-name-bg";

            const shipName = document.createElement("span");
            shipName.className = "ship-name";
            shipName.innerText = `${ship.name}`;

            shipNameBG.appendChild(shipName);
            card.appendChild(shipNameBG);

            card.onclick = async () => {

                    try {
                        const response = await fetch(ship.url);
                        const responseJson = await response.json();

                        const details = responseJson.result.properties;

                        const modal = document.getElementById("modal");
                        modal.style.visibility = "visible";
        
                        const modalContent = document.getElementById("modal-content");
                        modalContent.innerHTML = '';
        
                        const shipImage = document.createElement("div");
                        shipImage.style.backgroundImage =
                        `url('https://starwars-visualguide.com/assets/img/starships/${ship.url.replace(/\D/g, "")}.jpg')`;
                        shipImage.className = "ship-image";
        
                        const model = document.createElement("span");
                        model.className = "ship-details";
                        model.innerText = `Modelo: ${details.model}`;
        
                        const length = document.createElement("span");
                        length.className = "ship-details";
                        length.innerText = `Largura: ${details.length}`;
        
                        const crew = document.createElement("span");
                        crew.className = "ship-details";
                        crew.innerText = `Tripulacao: ${details.crew}`;
        
                        const passengers = document.createElement("span");
                        passengers.className = "ship-details";
                        passengers.innerText = `Passageiros: ${details.passengers}`;
        
                        const manufacturer = document.createElement("span");
                        manufacturer.className = "ship-details";
                        manufacturer.innerText = `Fabricante: ${details.manufacturer}`;
        
                        modalContent.appendChild(shipImage);
                        modalContent.appendChild(model);
                        modalContent.appendChild(manufacturer);
                        modalContent.appendChild(length);
                        modalContent.appendChild(crew);
                        modalContent.appendChild(passengers);

                    } catch(error) {
                        console.log(error);
                        alert('Erro ao carregar dados da nave')
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
        alert('Erro ao carregar as naves');
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadShips(responseJson.next);

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

        await loadShips(responseJson.previous);

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar a página anterior');
    }
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}