<template>
    <div class="input-wrap shadow">
        <input type="text" v-model="newItem" class="input-box" maxlength="30" @keyup.enter="addItem">
        <span @click="addItem" class="add-bt">
            <i class="fas fa-plus add-bt-icon"></i>
        </span>
    </div>
</template>

<script>
    import {
        ref
    } from 'vue';
    export default {
        setup() {
            const newItem = ref('');

            // 현재 시간값을 계산해서 중복이 되지 않는 값을 처리한다.
            // 용도는 key 와 id 를 생성해 주기 위해서 처리      
            // 10보다 작은 값에 0을 붙임
            const addZero = (n) => {
                return n < 10 ? '0' + n : n;
            }
            // 현재 시간을 리턴
            const getCurrentDate = () => {
                let date = new Date();
                return date.getFullYear().toString() + addZero(date.getMonth() + 1) + addZero(date.getDate()) +
                    addZero(date.getHours()) + addZero(date.getMinutes()) + addZero(date.getSeconds());
            }

            const addItem = () => {
                let temp = newItem.value;
                // 앞쪽 뒷쪽 공백 제거
                temp = temp.trim();
                // 추후 업데이트 예정(정규표현식-문자열체크 문법)
                //  앞자리공백   공백    뒷자리공백
                if (temp !== '') {
                    // json 저장 문자열
                    ///{completed:false, title:메모내용, icon:파일명 ....}
                    let memoTemp = {
                        id: getCurrentDate(),
                        complete: false,
                        memotitle: newItem.value
                    };

                    //추후 실제 DB 연동 예정
                    localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));

                    resetItem();
                }
            }

            // 내용 재설정
            const resetItem = () => {
                newItem.value = '';
            }

            return {
                newItem,
                addItem
            }
        }
    }
</script>

<style scoped>
    .input-wrap {
        position: relative;
        display: block;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
        background-color: #fff;
        overflow: hidden;
        margin: 40px 0;
    }

    .input-wrap input {
        border-style: none;
    }

    .input-wrap input:focus {
        outline: none;
    }

    .input-box {
        width: calc(93% - 60px);
        font-size: 16px;
        margin-left: 20px;
    }

    .add-bt {
        display: block;
        float: right;
        background-color: hotpink;
        cursor: pointer;
    }

    .add-bt-icon {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        margin: 0 20px;
    }
</style>