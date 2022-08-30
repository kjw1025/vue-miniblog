import {
    createStore
} from 'vuex';

// 데이터를 불러오는 내용
const storage = {
    getData() {
        const arr = [];
        const total = localStorage.length;

        if (total > 0) {
            for (let i = 0; i < total.value; i++) {
                // 추후 DB 연동 예정
                let obj = localStorage.getItem(localStorage.key(i));
                arr.push(JSON.parse(obj));
            }
            // 키값을 이용해서 정렬하기(오름차순)
            arr.sort((a, b) => {
                if (a.id > b.id) return 1;
                if (a.id === b.id) return 0;
                if (a.id < b.id) return -1;
            });
        }


        return arr;
    }
}

const timeUtill = {

    // 현재 시간값을 계산해서 중복이 되지 않는 값을 처리한다.
    // 용도는 key 와 id 를 생성해 주기 위해서 처리      
    // 10보다 작은 값에 0을 붙임
    addZero(n) {
        return n < 10 ? '0' + n : n;
    },

    // 현재 시간을 리턴
    getCurrentDate() {
        let date = new Date();
        return date.getFullYear().toString() + this.addZero(date.getMonth() + 1) + this.addZero(date.getDate()) +
            this.addZero(date.getHours()) + this.addZero(date.getMinutes()) + this.addZero(date.getSeconds());
    },

    getCurrentTime() {
        let date = new Date();
        return date.getFullYear().toString() + '.' + this.addZero(date.getMonth() + 1) + '.' + this.addZero(date.getDate()) +
            ' / ' +
            this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
    }
}

export default createStore({
    state: {
        headerText: 'My Diary Memo',
        memoItemArr: storage.getData(),
        iconArr: ['dog_1.png', 'dog_2.png']
    },

    actions: {},

    mutations: {

        // 아이템 추가 {item, index}
        ADD_MEMO(state, payload) {

            console.log(payload.item, payload.index);

            // json 저장 문자열
            ///{completed:false, title:메모내용, icon:파일명 ....}
            // 아이콘 관련 처리
            let memoTemp = {
                id: timeUtill.getCurrentDate(),
                complete: false,
                memotitle: payload.item,
                memodate: timeUtill.getCurrentTime(),
                memoicon: state.iconArr[payload.index]
            };
            // 추후 실제 DB 연동 예정
            localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));
            // 화면갱신을 위한 배열 요소 추가
            state.memoItemArr.push(memoTemp);
        },

        // 아이템 삭제 {item, index}
        DELETE_MEMO(state, payload) {
            // localStrage 에서 key를 통해서 지운다.
            localStorage.removeItem(payload.item);
            // 배열(memoItemArr) 에서도 지운다.
            state.memoItemArr.splice(payload.index, 1);
            // 키값을 이용해서 정렬하기(오름차순)
            state.memoItemArr.sort((a, b) => {
                if (a.id > b.id) return 1;
                if (a.id === b.id) return 0;
                if (a.id < b.id) return -1;
            });
        },

        // 아이템 변경 {item, index}
        UPDATE_MEMO(state, payload) {
            // localStorage 에서는 update 메소드를 지원하지 않습니다.
            // 찾아서 지우고, 
            localStorage.removeItem(payload.item.id);
            // 변경한다.
            // item.complete = !item.complete;
            state.memoItemArr[payload.index].complete = !state.memoItemArr[payload.index].complete;
            // 다시 set 한다.
            localStorage.setItem(payload.item.id, JSON.stringify(payload.item));

            // 키값을 이용해서 정렬하기(오름차순)
            state.memoItemArr.sort((a, b) => {
                if (a.id > b.id) return 1;
                if (a.id === b.id) return 0;
                if (a.id < b.id) return -1;
            });
        },

        // 전체 아이템 삭제
        CLEAR_MEMO(state) {
            // localStorage 에서 내용 전체 삭제
            // 추후 DB 연동 예정
            localStorage.clear();
            state.memoItemArr.splice(0);
        }

    },

    getters: {}
    
});