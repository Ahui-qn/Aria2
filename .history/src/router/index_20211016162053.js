import Vue from "vue";
import VueRouter from "vue-router";
import Downloading from '../views/Downloading'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Download",
    components: Download,
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
    path: '/task/:gid',
    name: 'TaskDetails',
    component: () => import(/* webpackChunkName: "TaskDetails" */ "../views/TaskDetails.vue")
  },
  


];

const router = new VueRouter({
  routes,
});

export default router;
