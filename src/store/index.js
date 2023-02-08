import { createStore, createLogger} from 'vuex'

import user from '@/store/modules/user.js'

export default createStore({
  modules: {
    user
  },
  plugins: [createLogger()]
})