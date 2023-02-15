import homePage from './views/app-home.cmp.js';
import aboutPage from './views/app-about.cmp.js';
import keepApp from './apps/keep/pages/keep-app.cmp.js';
import mailApp from './apps/mail/pages/mail-app.cmp.js';
import mailDetails from './apps/mail/pages/mail-details.cmp.js';
import mailList from './apps/mail/cmps/mail-list.cmp.js';
import composeScreen from './apps/mail/cmps/compose-screen.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter;

const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: '/',
    //   component: homePage,
    // },
    // {
    //   path: '/about',
    //   component: aboutPage,
    // },
    {
      path: '/mail',
      component: mailApp,
      redirect:'/mail/list',
      children: [
        {
            path: 'list',
            component: mailList,
            children: [
              {
                path: 'send/:id?',
                component: composeScreen,
              },
            ],
        },                
        {
          path: 'sent',
          // component: aboutTeam,
        },
        {
          path: 'trash',
          // component: aboutTeam,
        },
        {
          path: 'draft',
          // component: aboutTeam,
        },
        {
          path: ':id',
          component: mailDetails
        },                           
    ]
    },
    // {
    //   path: '/keep',
    //   component: keepApp,
    // },
  ],
};

export const router = createRouter(routerOptions);
