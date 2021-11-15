import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Aria2Client from "./aria2-client.js"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)


Vue.config.productionTip = false;


new Vue({
    data : {
        aria2: new Aria2Client({
            host: '127.0.0.1',
            port: 6800,
            secret: '123456' 
        })
    },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
