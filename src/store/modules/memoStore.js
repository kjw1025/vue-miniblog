import axios from 'axios';

// 데이터를 불러오는 내용
// const storage = {
//     getData() {
//         const arr = [];
//         const total = localStorage.length;
//         if (total > 0) {
//             for (let i = 0; i < total; i++) {
//                 // 추후 DB 연동 예정
//                 let obj = localStorage.getItem(localStorage.key(i));
//                 arr.push(JSON.parse(obj));
//             }
//             // 키값을 이용해서 정렬하기(오름차순)
//             arr.sort((a, b) => {
//                 if (a.id > b.id) return 1;
//                 if (a.id === b.id) return 0;
//                 if (a.id < b.id) return -1;
//             });
//         }

//         return arr;
//     }
// }

const timeUtil = {
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
        return date.getFullYear().toString() + '/' + this.addZero(date.getMonth() + 1) + '/' + this.addZero(date.getDate()) + '/' +
            this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes());
    }
}

const state = {
    headerText: 'My Diary Memo',
    memoItemArr: [],
    iconArr: ['dog1.png', 'dog2.png']
};

const actions = {

    fetchReadMemo(context) {
        axios
            .get('http://di1025.dothome.co.kr/page-miniblog/read.php')
            .then(response => {
                console.log(response.data);
                context.commit('READ_MEMO', response.data.result);
            })
            .catch(err => console.log(err));
    },

    fetchAddMemo(context, obj) {
        // 서버에 주소로 접근하여서 자료를 push 한다.
        // push 하고 나서 정상적으로 추가되었다면
        // 아래의 명령을 실행한다.

        let addData = {
            user: timeUtil.getCurrentDate(),
            title: obj.item,
            date: timeUtil.getCurrentTime(),
            icon: state.iconArr[obj.index]
        }

        axios
            .get(`http://di1025.dothome.co.kr/page-miniblog/write.php?user=${addData.user}&title=${addData.title}&date=${addData.date}&icon=${addData.icon}`)
            .then(response => {
                // console.log(response.data);
                if (response.data.result == 1) {
                    // console.log('목록가져오기');
                    context.commit("ADD_MEMO", addData);
                } else {
                    console.log('서버에러');
                }
            })
            .catch(err => console.log(err))

    },
    fetchDeleteMemo({
        commit
    }, obj) {
        // 서버에 주소로 접근해서 데이터를 DELETE.
        // DELETE 가 성공했다면
        // 아래를 실행한다.
        axios
            .get(`http://di1025.dothome.co.kr/page-miniblog/delete.php?id=${obj.id}`)
            .then(response => {
                console.log(response.data);
                commit("DELETE_MEMO", obj);
            })
            .catch(err => console.log(err))
    },
    fetchUpdateMemo({
        commit
    }, obj) {
        // 서버의 주소로 접근해서 FETCH 한다.
        // 정상적으로 처리되었다면
        // 아래를 실행한다.

        let complete = 1;
        if (obj.item.complete == true) {
            complete = 0;
        } else {
            complete = 1;
        }

        axios
            .get(`http://di1025.dothome.co.kr/page-miniblog/update.php?id=${obj.item.id}&complete=${complete}`)
            .then(response => {
                console.log("업데이트", response.data);
                commit("UPDATE_MEMO", obj);
            })
            .catch(err => console.log(err))


    },
    fetchClearMemo({
        commit
    }) {
        // 서버의 주소로 접근해서 DELETE 한다.
        // 정상적으로 처리되었다면
        // 아래를 실행한다.

        axios
            .get("http://di1025.dothome.co.kr/page-miniblog/delete.php?id=all")
            .then(response => {
                console.log('전체삭제', response.data);
                commit("CLEAR_MEMO");
            })
            .catch(err => console.log(err))

    },
}
const mutations = {

    READ_MEMO(state, payload) {

        payload.forEach((item) => {
            if (item.complete === "0") {
                item.complete = false;
            } else {
                item.complete = true;
            }
        });

        state.memoItemArr = payload;
    },

    // 아이템 추가 {item, index}
    ADD_MEMO(state, payload) {
        // json 저장 문자열
        ///{completed:false, title:메모내용, icon:파일명 ....}
        // 아이콘 관련 처리
        // let memoTemp = {
        //     id: timeUtil.getCurrentDate(),
        //     complete: false,
        //     memotitle: payload.item,
        //     memodate: timeUtil.getCurrentTime(),
        //     memoicon: state.iconArr[payload.index]
        // };
        // // 추후 실제 DB 연동 예정
        // localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));
        // 화면갱신을 위한 배열 요소 추가
        // state.memoItemArr.push(memoTemp);

        // axios를 이용해서 추가된 데이터의 정보를
        // 가지고 와서 목록 1개를 추가한다.
        axios
            .get(`http://di1025.dothome.co.kr/page-miniblog/get.php?user=${payload.user}`)
            .then(response => {
                // console.log('입력완료', response);
                const obj = response.data.result[0];
                obj.complete = false;
                state.memoItemArr.push(obj);
            })
            .catch(err => console.log(err))
    },
    // 아이템 삭제 {item, index}
    DELETE_MEMO(state, payload) {
        // localStrage 에서 key를 통해서 지운다.
        // localStorage.removeItem(payload.item);
        // 배열(memoItemArr) 에서도 지운다.
        state.memoItemArr.splice(payload.index, 1);

        // 키값을 이용해서 정렬하기(오름차순)
        // state.memoItemArr.sort((a, b) => {
        //     if (a.id > b.id) return 1;
        //     if (a.id === b.id) return 0;
        //     if (a.id < b.id) return -1;
        // });
    },
    // 아이템 변경 {item, index}
    UPDATE_MEMO(state, payload) {

        // localStorage 에서는 update 메소드를 지원하지 않습니다.
        // 찾아서 지우고, 
        // localStorage.removeItem(payload.item.id);
        // 변경한다.
        // item.complete = !item.complete;
        state.memoItemArr[payload.index].complete = !state.memoItemArr[payload.index].complete;
        // 다시 set 한다.
        // localStorage.setItem(payload.item.id, JSON.stringify(payload.item));

        // 키값을 이용해서 정렬하기(오름차순)
        // state.memoItemArr.sort((a, b) => {
        //     if (a.id > b.id) return 1;
        //     if (a.id === b.id) return 0;
        //     if (a.id < b.id) return -1;
        // });

    },
    // 전체 아이템 삭제
    CLEAR_MEMO(state) {
        // localStorage 에서 내용 전체 삭제
        // 추후 DB 연동 예정
        localStorage.clear();
        state.memoItemArr.splice(0);
    }
};
const getters = {
    getMemoArr(state) {
        // 조건에 따라서 다른 결과물을 돌려준다.
        return state.memoItemArr;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}