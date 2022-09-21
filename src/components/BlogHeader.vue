<template>
    <header class="header">
        <h1>{{title}}</h1>
    </header>
</template>

<script>
    import { ref} from 'vue';
    import {useStore} from 'vuex';


    export default {
        setup() {


                const title = ref('');
                const store = useStore();
                title.value = store.state.memoStore.headerText

                console.log(title.value);
        



            return {
                title
            }
        }
    }
</script>

<style scoped>
header {
    text-align: center;
    font-weight: 700;
    margin-top: 100px;
}
</style>