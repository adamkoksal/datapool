import Vue from "vue";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
Vue.prototype.$url = process.env.NODE_ENV === 'dev' ? "http://localhost:4000" : ""

new Vue({
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
