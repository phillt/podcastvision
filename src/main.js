import Vue from 'vue'
import App from './App.vue'
import routes from "./routes";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({routes});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: h => h(App),
});
