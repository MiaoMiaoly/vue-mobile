<template>
    <div class="header-box">
      <div class="left-icon">
        <span v-if="showback" @click="back" class="icon-back"></span>
        <span class="prinvince">{{provinceText}}</span>
      </div>
      <div class="header-tittle">
        <span v-if="showinput">
          <cus-input></cus-input>
        </span>
        <span v-if="!showinput">{{tittle}}</span>
      </div>
      <div class="right-icon">
        <span v-if="showmore" class="icon"></span>
      </div>
    </div>
</template>

<script>
import cusInput from 'common/cus-input'
import {mapMutations, mapGetters, mapState} from 'vuex'
export default {
  data() {
    return {
    }
  },
  props: {
    showright: {
      type: Boolean,
      default: false
    },
    showleft: {
      type: Boolean,
      default: false
    },
    showinput: {
      type: Boolean,
      default: false
    },
    tittle: {
      type: String,
      default: '标题'
    },
    showback: {
      type: Boolean,
      default: true
    },
    showmore: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    if(sessionStorage.getItem('province')!='' && sessionStorage.getItem('province')!=null){
       this.$store.commit('SET_PROVINCE',sessionStorage.getItem('province'));
    }
    else{
        this.GetCode();
    }
    //  this.initData();
  },
  methods: {
    ...mapMutations({
      setprovince: 'SET_PROVINCE'
    }),
    initData(){

              
      },
    back() {
      this.$router.goBack()
    },
    GetCode(){
      let map, geolocation,isRegeo=true;
      map = new AMap.Map('container', { resizeEnable: true});
      map.plugin('AMap.Geolocation', ()=>{
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 20000,
            buttonOffset: new AMap.Pixel(10, 20),
            zoomToAccuracy: true,
            buttonPosition:'RB'
          });
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', (data)=>{
            // console.log('定位成功===>')
            // console.log('经度：' + data.position.getLng())
            // console.log('纬度：' + data.position.getLat())
            // console.log('精度：' + data.accuracy + '米')
            // console.log('是否经过偏移：' + (data.isConverted ? '是' : '否'))
            if(isRegeo){
                this.regeocoder([data.position.getLng(), data.position.getLat()],(result)=>{
                  if(result){
                      // this.areaText = '定位成功！'
                      // setTimeout(()=>{
                      //   this.loadingActive = false
                      // },1500)
                  }else{
                      this.areaText = '定位失败,请稍后再试!'
                      setTimeout(()=>{
                      this.loadingActive = false
                    },1500)
                  }
                  // this.provinceText = result.province;
                  this.setprovince(result.province);
                  sessionStorage.setItem('province',result.province);
                  // if(result.city == ''){
                  //     this.cityText = result.province
                  // }else{
                  //     this.cityText = result.city
                  // }
                  // this.countyText = result.district
                  // this.address = result.address
                })
            }else{
                complete(data.position.getLng(),data.position.getLat(),null)
            }
          });
          AMap.event.addListener(geolocation, 'error',  (data)=>{
            console.log('定位失败===>'+data.message)
          });
      });
    },
    regeocoder(lnglatXY,complete) {
      let resultInfo = {}
      let geocoder = new AMap.Geocoder({radius: 1000,extensions: "all"});
      geocoder.getAddress(lnglatXY, (status, result)=>{
          if (status === 'complete' && result.info === 'OK') {
            let addressComponent = result.regeocode.addressComponent;
            let aois = result.regeocode.aois;
            let crosses = result.regeocode.crosses;
            let pois = result.regeocode.pois;
            let roads = result.regeocode.roads;
            let address = result.regeocode.formattedAddress;
            resultInfo.address = result.regeocode.formattedAddress;
            resultInfo.province = addressComponent.province;
            resultInfo.city = addressComponent.city;
            resultInfo.citycode = addressComponent.citycode;
            resultInfo.district = addressComponent.district;
            resultInfo.adcode = addressComponent.adcode;
            resultInfo.township = addressComponent.township;
            resultInfo.street = addressComponent.street;
            resultInfo.streetNumber = addressComponent.streetNumber;
            resultInfo.neighborhood = addressComponent.neighborhood;
            resultInfo.neighborhoodType = addressComponent.neighborhoodType;
            resultInfo.building = addressComponent.building;
            complete(resultInfo)
          }
      })
    } 
  },
  components: {
    cusInput
  },
  computed: {
    ...mapState({
      provinceText: state => state.common.province
    })
  }
}
</script>

<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.header-box{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .h(100);
  .lh(100);
  background-color: @base-color;
  color: @base-header-color;
  .fs(@base-header-size);
  display: flex;
  .left-icon{
    position: relative;
    flex: 1.5;
    .icon-back{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .left(25);
      .top(25);
      background-image: url("../assets/imgs/w-back.svg");
      background-size: cover;
    }
    .prinvince{
       .fs(30);
      position: absolute;
      display: inline-block;
      // .w(50);
      // .h(50);
      .left(67.5);
      // .top(25);
    }
  }
 
  .header-tittle{
    flex: 3;
  }
  .right-icon{
    position: relative;
    flex: 1;
    .icon{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .right(25);
      .top(25);
      background-image: url("../assets/imgs/more.svg");
      background-size: cover;
    }
  }
 
}
</style>
