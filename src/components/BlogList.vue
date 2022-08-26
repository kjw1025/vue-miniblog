<template>
    <div class="list-wrap">
        <ul>
            <!-- v-for in :key -->
            <li v-for="(item, index) in memoItemArr" :key="index" class="shadow">
                {{item}}
                <span class="remove-bt" @click="removeMemo(item, index)">
                    <i class="fas fa-minus"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import {ref, reactive} from 'vue';

    export default {
        setup() {
            console.log(localStorage);

            const total = ref(0);
            total.value = localStorage.length;
            console.log(total.value);

            const memoItemArr = reactive([]);

            if( total.value > 0 ) {
                for(let i = 0; i < total.value; i++) {
                    memoItemArr.push(localStorage.key(i));
                }
            }

            const removeMemo = (item, index) => {
                localStorage.removeItem(item);
                memoItemArr.splice(index, 1);
            }

            return {
                memoItemArr,
                removeMemo
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

</style>