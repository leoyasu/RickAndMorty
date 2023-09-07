function displayHome() {
    return `
        <div class="index">
        <div class="indexTitle">
            <img src="assets/img/logoHome.png" style="width: 85%;" alt="index logo">
        </div>

        <div class="card-container">
            <div class="card">
                <div id="characters" class="card-inner">
                    <div class="card-front">
                        <h3>CHARACTERS</h3>
                    </div>
                    <div class="card-back">
                        <p>Find and compare yoour favourite characters</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div id="locations" class="card-inner">
                    <div class="card-front">
                        <h3>LOCATIONS</h3>
                    </div>
                    <div class="card-back">
                        <p>Each one of the locations with all the related information</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div id="episodes" class="card-inner">
                    <div class="card-front">
                        <h3>EPISODES</h3>
                    </div>
                    <div class="card-back">
                        <p>Everything you need to know about each episode and its characters</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}