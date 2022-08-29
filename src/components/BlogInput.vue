<template>
    <div class="input-wrap shadow">
        <input type="text" v-model="newItem" class="input-box" maxlength="30" @keyup.enter="addItem">

        <span @click="addIcon(0)" class="img1">
            이미지1
        </span>
        <span @click="addIcon(1)" class="img2">
            이미지2
        </span>


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
        setup(props, context) {
            const newItem = ref('');
            const newIcon = ref(0);
            const addItem = () => {
                let temp = newItem.value;
                let icon = newIcon.value;
                // 앞쪽 뒷쪽 공백 제거
                temp = temp.trim();
                // 추후 업데이트 예정(정규표현식-문자열체크 문법)
                //  앞자리공백   공백    뒷자리공백
                if (temp !== '') {
                    context.emit("additem", temp, icon);
                    resetItem();
                }
            }
            // 내용 재설정
            const resetItem = () => {
                newItem.value = '';
            }
            const addIcon = (index) => {
                newIcon.value = index;
            }
            return {
                newItem,
                addItem,
                addIcon
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

    .img1 {
        display: inline-block;
        width: 50px;
        height: 50px;
        font-size: 0;
        cursor: pointer;
        background: url('@/assets/images/dog_1.png') no-repeat center;
        background-size: cover;
    }

    .img2 {
        display: inline-block;
        width: 50px;
        height: 50px;
        font-size: 0;
        cursor: pointer;
        background: url('@/assets/images/dog_2.png') no-repeat center;
        background-size: cover;
    }

    .add-bt {
        display: block;
        float: right;
        background-color: navy;
        cursor: pointer;
    }

    .add-bt:hover>i {
        transform: rotate(180deg);
    }

    .add-bt-icon {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        margin: 0 20px;

        transition: all 0.5s;
    }
</style>