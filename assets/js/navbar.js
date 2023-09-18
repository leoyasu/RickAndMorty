function showNavBar() {
    return `
        <nav class="nav-extended deep-purple lighten-1">
        <div class="nav-wrapper">
        <a id="logoHomeBtn" style="cursor: pointer ; " class="brand-logo left hide-on-med-and-down"> 
            <img style="height: 135px; width: 135;" src="../assets/img/logoNav.png" alt="logonNav">
        </a>

        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        
        <div class="container hide-on-med-and-down" style="display:flex; justify-content:center;">
            <ul id="nav-mobile" style="list-style: none;">
            <li><a id="charNavBtn" class="waves-effect waves-light btn">CHARACTER</a></li>
            <li><a id="locNavBtn" class="waves-effect waves-light btn">LOCATION</a></li>
            <li><a id="epiNavBtn" class="waves-effect waves-light btn">EPISODE</a></li>
            </ul>
        </div>
        
        <div class="container">
            <form  style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%);">
            <div class="input-field right">
                <input id="searchNavbar" type="search" placeholder="Buscar..." required>
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
            </div>
            </form>
        </div>
        </div>

        <div id="pagination" style="display:flex; justify-content:center;" class="nav-content">
        <ul class="pagination">
            <li class="disabled" id="prevPage"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                

            <li class="waves-effect" id="nextPage"><a href="#!"><i class="material-icons">chevron_right</i></a></li> 
        </ul>
        </div>        
    </nav>

    <ul class="sidenav" id="mobile-demo">
        <li><a href="../index.html">HOME</a></li>
        <li><a href="character.html">CHARACTERS</a></li>
        <li><a href="location.html">LOCATIONS</a></li>
        <li><a href="episode.html">EPISODES</a></li>
    </ul>
    `
}
// let currentPage = 1;
// let totalPages = 0;

function addNavListeners() {
    const buttonsIds = ['charNavBtn', 'locNavBtn', 'epiNavBtn', 'logoHomeBtn'];

    buttonsIds.forEach(id => {
        const button = document.getElementById(id);
        button.addEventListener('click', (e) => {
            pageToDisplay(e.currentTarget.id);
        });
    });
    // setPaginationItems() 
    // document.getElementById("nextPage").addEventListener("click", () => {
    //     if (currentPage < totalPages) {
    //         currentPage++;
    //         const apiUrl = `https://rickandmortyapi.com/api/character`;
    //         charPagination(apiUrl,currentPage);
    //     }

    // });


    // document.getElementById("prevPage").addEventListener("click", () => {
    //     if (currentPage > 1) {
    //         currentPage--;
    //         const apiUrl = `https://rickandmortyapi.com/api/character`;
    //         charPagination(apiUrl,currentPage);
    //     }
    // });

    setNavSearch();
}

async function setNavSearch() {
    const searchInput = document.getElementById("searchNavbar");

    searchInput.addEventListener("keyup", async () => {
        const searchValue = searchInput.value;
        //searchCachedData(searchValue);
        // fetchSearchData(searchValue).then(function(result){
        //     result.results.forEach(item => console.log(item))
        // });
        let fetchedData = await fetchSearchData(searchValue);
        // fetchSearchData(searchValue).then(function (result) {
        //     if (result !== null && result !== undefined) {
        //         displaySearchedData(result.results);
        //     }
        // });
        if (fetchedData) {
            displaySearchedData(fetchedData.results);
        }
    }
    );
}

async function displaySearchedData(searchedData) {
    var paginaActual = sessionStorage.getItem('paginaActual')

    switch (paginaActual) {
        case "location":
            displayAllLocations(searchedData);
            break;
        case "character":
            const containerCards = document.querySelector('.containerCards');
            containerCards.innerHTML = "";
            searchedData.forEach(async (input) => {
                
                let nameEpisode = await fetch(input.episode[0]).then(response => response.json()).then(episode => episode.name);
                let cardItem = document.createElement("div")
                cardItem.className = "cardCharacter"

                cardItem.appendChild(generarElemImagen(input.image))
                cardItem.appendChild(generarElemInfo(input.name,
                    input.status,
                    input.location.name,
                    nameEpisode))
                cardItem.appendChild(generarBoton())
                containerCards.appendChild(cardItem)
            });
            break;
        case "episode":
            displayAllEpisodes(searchedData);
            break;
        default:
            break;
    }
}


async function fetchSearchData(searchValue) {
    let page = sessionStorage.getItem('paginaActual');
    const urlEndPoint = `https://rickandmortyapi.com/api/${page}/?name=${searchValue}`;
    await fetch(urlEndPoint)
        .then(response => response.json())
        .then(json =>
            searchedData = json
        );
    return searchedData;
}


async function charPagination(charPagURL) {
    document.getElementById("containerCards").innerHTML = "";

    await mostrarPagina(charPagURL, currentPage);

    document.getElementById("prevPage").classList.toggle("disabled", currentPage === 1);
    document.getElementById("nextPage").classList.toggle("disabled", currentPage === totalPages);

}

function setPaginationItems() {

    const paginationContainer = document.querySelector(".pagination");
    const numberPageElements = document.querySelectorAll(".pagination li:not(#prevPage):not(#nextPage)");
    numberPageElements.forEach((element) => {
        paginationContainer.removeChild(element);
    });

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.classList.add("waves-effect");

        const a = document.createElement("a");
        a.href = "#!";
        a.textContent = i;

        a.addEventListener("click", () => {
            currentPage = i;
            const apiUrl = `https://rickandmortyapi.com/api/character`;
            charPagination(charPagURL, currentPage);
        });

        li.appendChild(a);
        paginationContainer.appendChild(li);
    }
}

// function searchCachedData(searchValue) {
//     let page = sessionStorage.getItem('paginaActual');
//     const cachedData = JSON.parse(sessionStorage.getItem(page));
//     getDataFromCached(cachedData.results, searchValue);
// }

// function getDataFromCached(cachedData, searchValue) {
//     const resultados = cachedData.filter(item => {
//         return item.name.toLowerCase().includes(searchValue.toLowerCase())
//     });
//     return resultados;
// }