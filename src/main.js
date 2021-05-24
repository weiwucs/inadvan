import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import * as Cesium from 'cesium/Cesium'
import * as widgets from "cesium/Widgets/widgets.css";

Vue.prototype.Cesium = Cesium
Vue.prototype.widgets = widgets

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
