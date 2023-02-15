export default {
  template: `
        <section class="home-page">

            <!-- <section class="big keep-section flex flex-column">
                <div class="app-img flex flex-row">
                    <img class="gmail app-logo" src="https://1000logos.net/wp-content/uploads/2021/05/Gmail-logo.png" alt="" />
                    <h1>Mail</h1> 
                </div>
                <div class="about-app">
                    <p>
                    Communicate was never more easy</p>
                </div>
                <div>
                    <router-link to="/mail">
                    <img class="app-logo" src="../assets/imgs/mail.png" alt="" />
                    </router-link> 
                </div>
            </section> -->

            <section class="big keep-section flex flex-column">
                <div class="app-img flex flex-row">
                    <img class="gml app-img" src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Gmail_2020.png" alt="" />
                    <h1>Gmail</h1> 
                </div>
                <div class="about-app">
                    <p> Communication was never easier</p>
                </div>
                <div>
                    <router-link to="/keep">
                    <img class="app-logo" src="assets/imgs/mail.png" alt="" />
                    </router-link> 
                </div>
            </section>
            <section class="big keep-section flex flex-column">
                <div class="app-img flex flex-row">
                    <img class="app-img" src="assets/imgs/keep.png" alt="" />
                    <h1>Keep</h1> 
                </div>
                <div class="about-app">
                    <p> Playful way to keep organized</p>
                </div>
                <div>
                    <router-link to="/mail">
                    <img class="app-logo" src="assets/imgs/keepapp.png" alt="" />
                    </router-link> 
                </div>
            </section>
        </section>
    `,
};
