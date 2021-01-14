import { firestoreAction } from 'vuexfire'
import { db } from '../../main'

const namespaced = true

const state = {
  id: null,
  name: null,
  email: null,
  partnerId: null,
  dishesDbPage: 1,
  matches: []
}

const mutations = {
  SET_USER_DATA: (state, payload) => {
    state.id = payload.id
    state.name = payload.name
    state.email = payload.email
    state.partnerId = payload.partnerId
    state.dishesDbPage = payload.dishesDbPage
  },
  CLEAR_USER_DATA: state => {
    state.id = null
    state.name = null
    state.email = null
    state.partnerId = null
    state.dishesDbPage = 1
    state.matches = []
  },
  SET_PARTNER_ID: (state, payload) => {
    state.partnerId = payload
  },
  SET_DISHES_DB_PAGE: (state, payload) => {
    state.dishesDbPage = payload
  }
}

const actions = {
  setUserData(context, userData) {
    context.commit('SET_USER_DATA', userData)
  },
  clearUserData(context, userData) {
    context.commit('CLEAR_USER_DATA', userData)
  },
  setPartnerID(context, id) {
    context.commit('SET_PARTNER_ID', id)
  },
  setDishesDbPage(context, pageNumber) {
    context.commit('SET_DISHES_DB_PAGE', pageNumber)
  },
  bindMatchesRef: firestoreAction(context => {
    return context.bindFirestoreRef(
      'matches',
      db
        .collection('users')
        .doc(context.state.id)
        .collection('matches')
    )
  })
}

const getters = {}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
