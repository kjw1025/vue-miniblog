<template>
  <div class="input-wrap shadow">
    <input
      type="text"
      v-model="newItem"
      class="input-box"
      maxlength="30"
      @keyup.enter="addItem"
      placeholder="내용을 입력해주세요"
    />

    <div class="input-info">
      <span @click="addIcon(0)" class="img1"> 이미지1 </span>
      <span @click="addIcon(1)" class="img2"> 이미지2 </span>

      <span @click="addItem" class="add-bt">
        <i class="fas fa-plus add-bt-icon"></i>
      </span>
    </div>

    <!-- 안내창 -->
    <ModalView v-bind:show="showModal" v-on:closemodal="showModal = false">
      <template #header>
        <h3>안내창</h3>
      </template>
      <template #body>
        <h2>내용을 작성하여주세요.</h2>
      </template>
    </ModalView>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import ModalView from "@/components/common/ModalVue.vue";
export default {
  components: {
    ModalView,
  },
  setup() {
    const store = useStore();

    const newItem = ref("");
    const newIcon = ref(0);
    const showModal = ref(false);

    const addItem = () => {
      let temp = newItem.value;
      let icon = newIcon.value;
      // 앞쪽 뒷쪽 공백 제거
      temp = temp.trim();
      // 추후 업데이트 예정(정규표현식-문자열체크 문법)
      //  앞자리공백   공백    뒷자리공백
      if (temp !== "") {
        // context.emit("additem", temp, icon);
        // store.commit('ADD_MEMO', {item:temp, index:icon});
        store.dispatch("fetchAddMemo", { item: temp, index: icon });

        resetItem();
      } else {
        showModal.value = true;
      }
    };
    // 내용 재설정
    const resetItem = () => {
      newItem.value = "";
    };
    const addIcon = (index) => {
      newIcon.value = index;
    };

    return {
      newItem,
      addItem,
      addIcon,
      showModal,
    };
  },
};
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
  width: 35px;
  height: 35px;
  font-size: 0;
  cursor: pointer;
  background: url("@/assets/images/문서1.png") no-repeat center;
  background-size: cover;
  margin-top: 7px;
  margin-right: 5px;
}

.img2 {
  display: inline-block;
  width: 35px;
  height: 35px;
  font-size: 0;
  cursor: pointer;
  background: url("@/assets/images/문서2.png") no-repeat center;
  background-size: cover;
  margin-right: 5px;
}

.input-info {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
}

.add-bt {
  display: block;
  float: right;
  background-color: navy;
  cursor: pointer;
}

.add-bt:hover > i {
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
