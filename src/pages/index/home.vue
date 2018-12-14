<template>
  <div class="home">
    <common-header :showinput="true" :showback="false"></common-header>
    <div class="page-content">
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(item,index) in swiperList" :key="index">
          <img :src="item.img"/>
        </mt-swipe-item>
      </mt-swipe>
      <ul class="list">
        <li v-for="(item,index) in lazyImg" :key="index">
          <img v-lazy="item.img">
        </li>
      </ul>
      <mt-button size="normal" type="primary" @click="toast">normal</mt-button>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'

export default {
  data () {
    return {
      swiperList:[
        {img:require('../../assets/imgs/1.jpg')},
        {img:require('../../assets/imgs/2.jpg')},
        {img:require('../../assets/imgs/3.jpg')},
        {img:require('../../assets/imgs/4.jpg')},
      ],
      lazyImg:[
        {img:require('../../assets/imgs/list.jpg')},
        {img:require('../../assets/imgs/list2.jpeg')},
        {img:require('../../assets/imgs/list3.jpg')},
        {img:require('../../assets/imgs/list4.jpg')},
        {img:require('../../assets/imgs/list5.jpg')},
        {img:require('../../assets/imgs/list6.jpg')},
        {img:require('../../assets/imgs/list7.jpg')},
        {img:require('../../assets/imgs/list8.jpg')},
        {img:require('../../assets/imgs/list9.jpg')},
      ]
    }
  },
  created() {
  },
  methods: {
    toast(){
      this.$Toast('提示信息');
    }
  },
  components: {
    commonHeader
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.home{
  .padding(0,0,90,0);
  .margin(0,0,80,0);
  .page-content{
    background: #fff;
    .swiper{
       .h(300);
       img{
         width: 100%;
         height: 100%;
       }
    }
    .list>li{
      list-style: none;
      .margin(15,0);
      img{
        .w(675);
        .h(300);
         margin: auto;
      }
    }
  }
}

</style>
