<template>
    <div class="list-wrap">
        <ul>
            <!-- v-for in :key -->
            <li v-for="(item, index) in memoItemArr" :key="index" class="shadow">

                <i class="fas fa-check-circle check-bt" @click="updateMemo(item)" :class="{memoComplete:item.complete}"></i>

                <span :class="{memoCompleteTxt:item.complete}">{{item.memotitle}}</span>
                <span class="remove-bt" @click="removeMemo(item.id, index)">
                    <i class="fas fa-minus"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {
        ref,
        reactive
    } from 'vue';

    export default {
        setup() {

            const total = ref(0);
            total.value = localStorage.length;
            console.log(total.value);

            const memoItemArr = reactive([]);

            if (total.value > 0) {
                for (let i = 0; i < total.value; i++) {
                    //추후 실제 DB 연동 예정
                    let obj = localStorage.getItem(localStorage.key(i));
                    memoItemArr.push(JSON.parse(obj));
                }
                memoItemArr.sort();
            }

            const removeMemo = (item, index) => {
                localStorage.removeItem(item);
                memoItemArr.splice(index, 1);
            }

            const updateMemo = (item) => {
                // 찾아서 지우고 다시 set 한다.
                localStorage.removeItem(item.id);
                // 변경한다
                item.complete = !item.complete;
                // set
                localStorage.setItem(item.id, JSON.stringify(item));
            }

            return {
                memoItemArr,
                removeMemo,
                updateMemo
            }
        }
    }
</script>

<style scoped>
    li {
        position: relative;
        display: flex;
        min-height: 50px;
        line-height: 50px;
        margin: 10px 0;
        background-color: #fff;
        border-radius: 5px;
        padding: 0 10px;
        overflow: hidden;
    }

    .remove-bt {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        background-color: skyblue;

        color: #fff;
        text-align: center;
        width: 50px;
        height: 100%;
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
</style>