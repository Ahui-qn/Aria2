import Vue from "vue";
import VueRouter from "vue-router";
import Downloading from '../views/Downloading'
import Download from '../views/Download'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Download,
    redirect: '/downloading'
  },
  {
    path: "/downloading",
    name: "Downloading",
    component: Downloading,
  },
  {
    path:"/completed",
    name: 'Completed',
    component: () => import(/* webpackChunkName: "Completed" */ "../views/Completed.vue")
  },
  {
    path:"/deleted",
    name: 'Deleted',
    component: () => import(/* webpackChunkName: "Deleted" */ "../views/Deleted.vue")
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
