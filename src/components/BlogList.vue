<template>
  <div class="list-wrap">
    <TransitionGroup name="list" tag="ul">
      <!-- <ul> -->
      <!-- v-for in :key -->
      <li v-for="(item, index) in items" :key="index" class="shadow">
        <i
          class="fas fa-check-circle check-bt"
          @click="updateMemo(item, index)"
          :class="{ memoComplete: item.complete }"
        ></i>

        <span :class="{ memoCompleteTxt: item.complete }" class="maintxt">
          {{ item.memotitle }}
        </span>

        <div class="info">
          <span
            class="icon"
            :style="{
              backgroundImage:
                'url(' + require(`@/assets/images/${item.memoicon}`) + ')',
            }"
          ></span>
          <span class="date">{{ item.memodate }}</span>
          <span class="remove-bt" @click="removeMemo(item.id, index)">
            <i class="fas fa-minus"></i>
          </span>
        </div>
      </li>
      <!-- </ul> -->
    </TransitionGroup>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    // vuex store 사용
    const store = useStore();
    store.dispatch("fetchReadMemo");
    const items = computed(() => store.getters.getMemoArr);
    // items.value = store.state.memoItemArr;

    const removeMemo = (id, index) => {
      // context.emit('removeitem', item, index);
      // store.commit('DELETE_MEMO', {item, index});
      store.dispatch("fetchDeleteMemo", { id, index });
    };
    const updateMemo = (item, index) => {
      // context.emit("updateitem", item, index);
      // store.commit('UPDATE_MEMO', {item, index});
      store.dispatch("fetchUpdateMemo", { item, index });
    };

    return {
      removeMemo,
      updateMemo,
      items,
    };
  },
};
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  min-height: 50px;
  line-height: 50px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 0 0 20px;

  overflow: hidden;
}

.maintxt {
  font-size: 18px;
  font-weight: 600;
}

.info {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 100%;
  margin-left: auto;
}
.icon {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 35px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.date {
  font-size: 14px;
  font-weight: 600;
}
.remove-bt {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 100%;

  background-color: #62acde;
  cursor: pointer;
  text-align: center;
}
.remove-bt i {
  font-size: 18px;
  line-height: 55px;
  color: #fff;

  transition: all 0.5s;
}
.remove-bt:hover i {
  transform: rotate(180deg);
}

.check-bt {
  color: #62acde;
  line-height: 50px;
  margin-right: 10px;
  cursor: pointer;
}

.memoComplete {
  color: #b3adad;
}

.memoCompleteTxt {
  color: #b3adad;
  text-decoration: line-through;
}
/* 애니메이션 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
