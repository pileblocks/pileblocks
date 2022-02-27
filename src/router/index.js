import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import FieldTilesPart from '../views/FieldTilesPart'
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
        }
        else {
            return {items: route.params.items.split("/").map((item) => parseInt(item))};
        }
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
