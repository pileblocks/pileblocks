import Vue from 'vue'
import VueRouter from 'vue-router'
import FieldParts from '../views/FieldParts'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'FieldParts',
    component: FieldParts
  }
]

const router = new VueRouter({
  routes
})

export default router
