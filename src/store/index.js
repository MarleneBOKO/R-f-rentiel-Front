import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Universal from "./modules/universal/index";

import Admin from "./modules/admin/index";
import User from "./modules/user/index";

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: { Universal, Admin, User },
});
