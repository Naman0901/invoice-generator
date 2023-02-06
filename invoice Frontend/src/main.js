import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Routes from './Route';
import VueSession from 'vue-session';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueSession);

const router =new VueRouter({
  routes: Routes,
  mode: 'history'
})

Vue.directive('rainbow',{
  bind(el, binding, vnode){
    el.style.color = "#"+Math.random().toString().slice(2,8);
  }
})
Vue.directive('backrainbow',{
  bind(el, binding, vnode){
    el.style.background = "#"+Math.random().toString().slice(2,8);
  }
})

Vue.directive('theme',{
  bind(el, binding, vnode){
    if(binding.value == "wide"){
      el.style.maxWidth= "1200px";
    }
    else if(binding.value == "narrow"){
      el.style.maxWidth= "560px";
    }
    if(binding.arg == 'column'){
      el.style.background = "#"+Math.random().toString().slice(2,8);
      el.style.padding = "20px";
    }
  }
})

Vue.filter('to-uppercase',function(value){
  return value.toUpperCase();
});

Vue.filter('snippet', function(value){
  return value.slice(0, 100) + '...';
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
