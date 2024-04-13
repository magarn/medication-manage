const user = {
	state: {
		user: "",
		isLogin: "",
		Id: ""
	},
	mutations: {
		USER_INFO(state, data) {
			state.user = data
		},
		USER_Id(state, data) {
			state.Id = data
		},
		isLogin(state, data) {
			state.isLogin = data
		}
	},
	actions: {
		saveUserInfo({
			commit
		}, data) {
			commit('USER_INFO', data)
		},
		saveUserId({
			commit
		}, data) {
			commit('USER_Id', data)
		},
		isLogin({
			commit
		}, data) {
			commit('isLogin', data)
		},
		/*退出登录*/
		LogOut({
			commit
		}) {
			commit('isLogin', '')
			commit('USER_Id', '')
			commit('USER_INFO', '')
		}

	},
	getters: {
		getName: (state) => state.user,
		getId: (state) => state.Id,
		isLogin: (state) => state.isLogin
	}
};
export default user
