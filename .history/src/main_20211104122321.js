import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Aria2Client from "./aria2-client.js"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'

Vue.use(ElementUI)


Vue.config.productionTip = false;

window.aria3 = new Aria2Client({
                    host: 'localhost',
                    port: 6800,
                    secret: '123456',
                })
Vue.prototype.myWindow = window

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
