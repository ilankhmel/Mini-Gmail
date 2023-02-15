export default {
  template: `
       <header class="app-header">
    
            <router-link to="/">
            <img class='site-logo' src='assets/img/AppSus.png' alt="" />
            </router-link>
            <router-link to="/"><h1>AppSus</h1></router-link>
       

            <nav>
                <router-link to="/keep">Keep</router-link> 
                <router-link to="/mail">Mail</router-link> 
                <!-- <router-link to="/about">About</router-link> -->
            </nav>
        </header>
    `,
};
// import '../assets/img/AppSus.png'
