import store from '@/store'

const NAMESPACE_ID = 'AudioInputPlayer'

const audio = (() => {
  let audio = document.getElementById(NAMESPACE_ID)
  if (!audio) {
    audio = document.createElement('audio')
    audio.id = NAMESPACE_ID
    audio.style.display = 'none'
    audio.isPlay = function () {
      return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2)
    }
    audio.addEventListener('ended', function () {
      store.commit(`${NAMESPACE_ID}/SET_STATUS`, 'paused')
    })
    document.body.appendChild(audio)
  }
  return audio
})()

const AudioPlayer = {
  namespaced: true,
  state: {
    id: 0,
    status: 'paused',
  },
  mutations: {
    SET_ID (state, id) {
      state.id = id
    },
    SET_STATUS (state, status) {
      state.status = status
    },
  },
  actions: {
    pause ({ commit, state }, id) {
      if (state.id === id || id === undefined) {
        commit('SET_STATUS', 'paused')
        commit('SET_ID', 0)
        audio.pause()
      }
    },
    play ({ state, dispatch, commit }, data) {
      if (audio.isPlay() && state.id === data.id) {
        dispatch('pause', data.id)
      } else {
        commit('SET_STATUS', 'playing')
        commit('SET_ID', data.id)
        audio.src = data.src
        audio.onerror = function () {
          dispatch('pause', data.id)
        }
        audio.play()
      }
    },
  },
}

store.registerModule(NAMESPACE_ID, AudioPlayer)

export function playStatus (callback) {
  return function () {
    if (store.state[NAMESPACE_ID].id !== this._uid) {
      return callback.call(this, 'paused')
    }
    return callback.call(this, store.state[NAMESPACE_ID].status)
  }
}

export function play (data) {
  if (typeof data === 'string' && this) {
    data = { src: data, id: this._uid }
  }
  store.dispatch(`${NAMESPACE_ID}/play`, data)
}

export function pause (id) {
  if (!id && this) {
    id = this._uid
  }
  store.dispatch(`${NAMESPACE_ID}/pause`, id)
}
