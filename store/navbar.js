export const state = () => ({
  isBlackNavbar: false,
});

export const mutations = {
  SET_BLACK_NAVBAR(state, payload) {
    state.isBlackNavbar = payload;
  },
};

export const getters = {
  IS_BLACK_NAVBAR(state) {
    return state.isBlackNavbar;
  },
};
