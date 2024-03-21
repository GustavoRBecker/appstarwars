const stars = 500;

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