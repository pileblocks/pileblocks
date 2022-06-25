import Vue from 'vue'
import VueRouter from 'vue-router'
import GamePic from '../views/GamePic'
//import FieldTilesPart from '../views/FieldTilesPart'
const Home = () => import('../views/Home');
const FieldTilesPart = () => import('../views/FieldTilesPart');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/field/fragments/:items*',
        name: 'FieldTilesPart',
        component: FieldTilesPart,
        props(route) {
            if (Array.isArray(route.params.items)) {
                return {items: route.params.items};
            } else {
                return {items: route.params.items.split("/").map((item) => parseInt(item))};
            }
        }
    },
    {
        path: '/game/:id',
        name: 'Game',
        component: Home
    },
    {
        path: '/gamepic/',
        name: 'GamePic',
        component: GamePic
    },

]

const router = new VueRouter({
    routes
})

export default router
