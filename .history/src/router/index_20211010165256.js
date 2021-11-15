import Vue from "vue";
import VueRouter from "vue-router";
import Downloading from '../views/Downloading'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Downloading",
    component: Downloading,
  },
  {
    path:"/completed",
    name: 'Completed',
    component: () => import(/* webpackChunkName: "Completed" */ "../views/Completed.vue")
  },
  {
    path: '/new',
    name: 'new',
    component: () => import(/* webpackChunkName: "newTask" */ "../views/NewTask.vue")
  },
  {
    path: '/taskdetails',
    name: 'TaskDetails',
    component: () => import(/* webpackChunkName: "TaskDetails" */ "../views/NewTask.vue")
  }


];

const router = new VueRouter({
  routes,
});

export default router;
