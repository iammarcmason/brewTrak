import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

// import views
import About from '@/components/about';
import Create from '@/components/create';
import Dashboard from '@/components/dashboard';
import Edit from '@/components/edit';
import Login from '@/components/login';
import Navigation from '@/components/navigation';
import Settings from '@/components/settings';
import View from '@/components/view';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: 'dashboard'
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/create',
    name: 'create',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/navigation',
    name: 'navigation',
    component: Navigation
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view/:brewID',
    name: 'view',
    component: View,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
