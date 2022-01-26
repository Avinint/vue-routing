import { createRouter, createWebHistory } from 'vue-router'

import TeamsList from "@/vues/TeamsList";
import TeamMembers from "@/vues/TeamMembers";
import UsersList from "@/vues/UsersList";
import NotFound from "@/vues/NotFound";
import TeamsFooter from "@/vues/TeamsFooter";
import UsersFooter from "@/vues/UsersFooter";

const routes = [
  {path: '/', redirect: '/teams'},
  {
    name: 'teams',
    path: '/teams',
    meta: {'needsAuth': true},
    components: {default: TeamsList, footer: TeamsFooter},
    children: [
      {
        name: 'team-members',
        path: ':teamId', component: TeamMembers, props: true},
    ]},
  { path: '/users',
    name: 'users',
    components: {
      default: UsersList,
      footer: UsersFooter
    },
    beforeEnter(to, from, next) {
      console.log("Users before enter");
      console.log(to, from);
      next();
    }
  },

  { path: '/:notFound(.*)', component: NotFound},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {left: 0, top: 0};
  }
});

router.beforeEach(function(to, from, next) {
  console.log("Global beforeEach");
  console.log(to, from);
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({name: 'team-members', params: { teamId: 't2'}});
  // }
  // if (to.meta.needsAuth) {
  //   next(prompt("Connaissez vous le mot de passe ?") === 'doing42');
  // } else {
  next();
  // }

});

router.afterEach(function(to, from) {
  console.log("afterEach");
  console.log(to, from);
});

export default router;