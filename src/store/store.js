import {
    createStore
} from 'vuex';

import memoStore from './modules/memoStore';
export default createStore({
    modules: {
        memoStore
    }
});