<template>
  <div class="wrap">
    <BlogHeader />
    <BlogInput @additem ="addMemo"/>
    <BlogList v-bind:memodata="memoItemArr" @removeitem="deleteMemo" v-on:updateitem="updateMemo" />
    <BlogFooter @deleteitem="clearMemo"/>
  </div>
</template>

<script>
  import {ref, reactive} from 'vue';

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
    },
    setup() {

       // localstorage 의 목록을 가지고 오기    
    // 전체 개수
    const total = ref(0);
    total.value = localStorage.length;
    // 데이터를 저장하는 배열
    const memoItemArr = reactive([]);
    if( total.value > 0) {
      for(let i = 0; i < total.value; i++) {
        // 추후 DB 연동 예정
        let obj = localStorage.getItem( localStorage.key(i) );       
        memoItemArr.push(JSON.parse(obj));
      }
      // 키값을 이용해서 정렬하기(오름차순)
      // memoItemArr.sort();
    }
    const deleteMemo = (item, index) => {
      console.log(item);
      console.log(index);
      // localStrage 에서 key를 통해서 지운다.
      localStorage.removeItem(item);
      // 배열(memoItemArr) 에서도 지운다.
      memoItemArr.splice(index, 1);
    }
    const updateMemo = (item) => {
      // localStorage 에서는 update 메소드를 지원하지 않습니다.
      // 찾아서 지우고, 
      localStorage.removeItem(item.id);
      // 변경한다.
      item.complete = !item.complete;
      // 다시 set 한다.
      localStorage.setItem(item.id, JSON.stringify(item));
    }
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

   const getCurrentTime= () => {
      let date = new Date();
      return date.getFullYear().toString() + '.' + addZero(date.getMonth() + 1) + '.' + addZero(date.getDate()) + ' / ' +
        addZero(date.getHours()) + ':' + addZero(date.getMinutes());              
    }

    const iconArr = ['dog_1.png', 'dog_2.png'];

    const addMemo = (item, index) => {
        // json 저장 문자열
        ///{completed:false, title:메모내용, icon:파일명 ....}
        let memoTemp = {
          id: getCurrentDate(),
          complete: false,
          memotitle: item,
          memodate: getCurrentTime(),
          memoicon: iconArr[index]

        };
        // 추후 실제 DB 연동 예정
        localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));
        // 화면갱신을 위한 배열 요소 추가
        memoItemArr.push(memoTemp);
    }
    const clearMemo = () => {
      // localStorage 에서 내용 전체 삭제
      // 추후 DB 연동 예정
      localStorage.clear();
      memoItemArr.splice(0);
    }

      return {
        memoItemArr,
        deleteMemo,
        updateMemo,
        addMemo,
        clearMemo
      }
    }
  }
</script>


<style>
  @charset 'utf-8';

  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');  

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
    font-family: 'EB Garamond', 'Noto Sans KR', sans-serif;
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