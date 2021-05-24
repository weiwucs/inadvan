<template>
  <div id="cesiumContainer"/>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{

    };
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){
      var Cesium = this.Cesium;
      let viewerOption = {
        geocoder: false, // 地理位置查询定位控件
        homeButton: false, // 默认相机位置控件
        timeline: false, // 时间滚动条控件
        navigationHelpButton: false, // 默认的相机控制提示控件
        fullscreenButton: false, // 全屏控件
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        sceneModePicker: false, //经纬网图标，选择视角的模式，有三种：3D，2D，哥伦布视图（2.5D)
        baseLayerPicker: false, // 底图切换控件，地图图标，图层选择器，选择要显示的地图服务和地形服务
        animation: false, // 控制场景动画的播放速度控件
        //虚拟现实
        vrButton: false,
        //阴影
        shadows: false,
        //点击后显示详细信息
        infoBox: false,
        //展示数据版权属性
        CreditsDisplay: false,
      };
      let viewer = new Cesium.Viewer(this.$el, viewerOption);
      viewer.cesiumWidget.creditContainer.style.display = "none";// 隐藏版权

      // var earthPosition = viewer.camera.pickEllipsoid(event.position,viewer.scene.globe.ellipsoid); //视角穿过球面点的位置
      // var cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());

      viewer.scene.debugShowFramesPerSecond = true; //显示帧率

      // 气泡窗
      function getInfo(){
        //开始查询
        var handler3D = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler3D.setInputAction(function(event) {
          var pick = viewer.scene.pick(event.position);
          console.log(pick);
          console.log("点击位置（屏幕坐标）"+event.position); //movement.position，屏幕坐标
          var position = viewer.scene.pickPosition(event.position);
          console.log("点击位置笛卡尔"+position);
          var cartographicnew = Cesium.Cartographic.fromCartesian(position);
          console.log("点击位置弧度" + cartographicnew);
          console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");


          // 获取经纬度
          var earthPosition = viewer.camera.pickEllipsoid(event.position,viewer.scene.globe.ellipsoid); //视角穿过球面点的位置
          var cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
          console.log("视角中心笛卡尔" + earthPosition);
          console.log("视角中心弧度" + cartographic);
          var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
          var lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
          // var height=cartographic.height.toFixed(2);
          var height=(viewer.camera.positionCartographic.height/1000).toFixed(2);
          console.log("---------------------------------------------------------------");



          // 气泡位置
          var winpos = viewer.scene.cartesianToCanvasCoordinates(earthPosition); //屏幕坐标
          console.log("屏幕坐标1:"+winpos);
          var bubble = document.getElementById("infoboxx");
          bubble.style.left = winpos.x + 20 + "px";
          bubble.style.top = winpos.y + 50 + "px";



          // 气泡位置2
          var obj = {position:event.position};
          var c = new Cesium.Cartesian2(obj.position.x, obj.position.y);
          console.log("屏幕坐标2:"+c);
          // var x = c.x-1000;
          // var y = c.y-430 ;
          // $('#infoboxx').css('transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)'); //设置点击时 div弹出来的位置

        },Cesium.ScreenSpaceEventType.LEFT_CLICK);

      }
    }
  }
}
</script>

<style lang='scss' scoped>
  #cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
