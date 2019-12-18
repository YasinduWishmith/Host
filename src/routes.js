import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue';

Vue.use(VueRouter);
const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes :[
          {path: '/',component:Home},
          {path: '/details',component:Home}
        ],
});

export default router
