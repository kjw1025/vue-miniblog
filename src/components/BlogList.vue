<template>
    <div class="list-wrap">
        <TransitionGroup name="list" tag="ul">
            <!-- <ul> -->
            <!-- v-for in :key -->
            <li v-for="(item, index) in memodata" :key="index" class="shadow">

                <i class="fas fa-check-circle check-bt" @click="updateMemo(item, index)"
                    :class="{memoComplete:item.complete}"></i>

                <span :class="{memoCompleteTxt:item.complete}">{{item.memotitle}}</span>

                <div class="info">
                    <span class="icon"
                        :style="{backgroundImage:'url(' + require(`@/assets/images/${item.memoicon}`) + ')'}"></span>
                    <span class="date">{{item.memodate}}</span>
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
    export default {
        props: ['memodata'],
        setup(props, context) {
            const removeMemo = (item, index) => {
                context.emit('removeitem', item, index);
            }
            const updateMemo = (item, index) => {
                context.emit("updateitem", item, index);
            }
            return {
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

    .info {
        margin-left: auto;
    }

    .icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-right: 10px;
        background-size: cover;

    }

    .date {
        font-family: 'Noto Sans KR';
        margin-right: 60px;
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

    .remove-bt>i {
        transition: all 0.5s;
    }

    .remove-bt:hover>i {
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