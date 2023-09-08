const cards = document.querySelectorAll('.card-inner');


cards.forEach(card => {
    card.addEventListener('click', (e) => {
        pageToDisplay(e.currentTarget.id);
    });
});

function pageToDisplay(pageFromClick) {
    let pageNavBar = document.getElementById("headerNavBar");
    let page = document.getElementById("root");
    pageNavBar.innerHTML = showNavBar();
    switch (pageFromClick) {
        case "characters":
            
            page.innerHTML = displayCharacter();
            break;
        case "locations":
            page.innerHTML = displayLocation();
            break;
        case "episodes":
            page.innerHTML = displayEpisode();
            break;
        default:
            page.innerHTML = displayHome();
            break;
    }
}