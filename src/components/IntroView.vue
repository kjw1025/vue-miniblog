<template>
    <div class="intro-wrap" @click="closeIntro">
        <h1>My Memo</h1>
        <div class="intro-cont">
            <img :src="require('@/assets/images/dog_1.png')" />
        </div>
    </div>
</template>

<script>
    export default {
        setup(props, context) {
            const closeIntro = () => {
                context.emit('closeintro');
            }
            return {
                closeIntro
            }
        }
    }
</script>

<style scoped>
    .intro-wrap {
        position: fixed;
        left: 0;
        top: 0;
        display: block;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        text-align: center;
        cursor: pointer;
    }
</style>