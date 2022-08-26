<template>
  <div class="wrap">
    <BlogHeader />
    <BlogInput />
    <BlogList />
    <BlogFooter />
  </div>
</template>

<script>
  import BlogHeader from '@/components/BlogHeader.vue';
  import BlogInput from '@/components/BlogInput.vue';
  import BlogList from '@/components/BlogList.vue';
  import BlogFooter from '@/components/BlogFooter.vue';

  export default {
    components: {
      BlogHeader,
      BlogInput,
      BlogList,
      BlogFooter
    }
  }
</script>


<style>
  @charset 'utf-8';

  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
  }

  img {
    vertical-align: middle;
    border: 0;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  html {
    font-size: 16px;
    overflow-x: hidden;
  }

  body {
    font-family: 'Kalam', cursivem, 'Noto Sans KR', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.64;
    color: #000;
    background-color: #f6f6f6;
  }

  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }

  .wrap {
    position: relative;
    display: block;
    width: 90%;
    margin: 0 auto;
  }

  </style>