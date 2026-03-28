import AuthService from '../services/AuthService';

const user = AuthService.getCurrentUser();

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      try {
        const response = await AuthService.login(user.email, user.password);
        commit('loginSuccess', response);
        return response;
      } catch (error) {
        commit('loginFailure');
        throw error; // Propagate the error to be handled by the component
      }
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(
        user.firstName,
        user.lastName,
        user.email,
        user.phoneNumber,
        user.password,
        user.entityType
      ).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshUser({ commit }) {
      const user = AuthService.getCurrentUser();
      if (user) {
        commit('loginSuccess', user);
      }
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.status.loggedIn;
    },
    currentUser(state) {
      return state.user;
    },
    hasRole: (state) => (role) => {
      if (!state.user || !state.user.user || !state.user.user.roles) {
        return false;
      }
      return state.user.user.roles.includes(role);
    },
    hasPermission: (state) => (permission) => {
      if (!state.user || !state.user.user || !state.user.user.permissions) {
        return false;
      }
      return state.user.user.permissions.includes(permission);
    }
  }
}; 