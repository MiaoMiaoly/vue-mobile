import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import common from './modules/common'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = true
/* eslint-disable */
export default new Vuex.Store({
  modules: {
    home,
    common
  },
  plugins: debug ? [createLogger()] : []   // 是否开启vuex的debug模式
})
