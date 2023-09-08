const cards = document.querySelectorAll('.card-inner');


cards.forEach(card => {
    card.addEventListener('click', (e) => {
        pageToDisplay(e.currentTarget.id);
    });
});

function pageToDisplay(pageFromClick) {
    let pageNavBar = document.getElementById("headerNavBar");
    let page = document.getElementById("root");

    switch (pageFromClick) {
        case "characters":
            pageNavBar.innerHTML = showNavBar();
            page.innerHTML = displayCharacter();
            break;
        case "locations":
            pageNavBar.innerHTML = showNavBar();
            page.innerHTML = displayLocation();
            break;
        case "episodes":
            pageNavBar.innerHTML = showNavBar();
            page.innerHTML = displayEpisode();
            break;
        default:
            page.innerHTML = displayHome();
            break;
    }
}