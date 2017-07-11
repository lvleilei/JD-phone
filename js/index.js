/**
 * Created by 鬼儿 on 2017/3/12.
 */
//alert(1);
window.onload = function () {
    //头部滚动变色
    setHeader();

    //倒计时
    downTime();

    //轮播图
    banner();

}



//当页面滚动时 header变色
//当页面滚动高度小于banner高度时，header透明度发生变化
//当页面滚动高度大于banner高度时，header透明度是固定的
//透明度的取值=页面滚动/banner的高度
function setHeader(){
    var banner = document.querySelector('.jd-banner');
    var H = banner.offsetHeight;//获取banner的高度
    var headerIn = document.querySelector('.header-in');
    var opacity = 0;

    window.onscroll = function () {
        var top = document.body.scrollTop;//页面头部滚出去的高度
        console.log(top);
        opacity = top/H;
        //保证透明度不超过0.85
        if(opacity>0.85){
            opacity = 0.85;
        }
        //把透明度的值赋值给header-in
        headerIn.style.background = 'rgba(201, 21, 35, '+opacity+')';//不能用""
    };
};


//倒计时
function downTime() {
    var time = 5*60*60;
    var spans = document.querySelectorAll(".sk-time span");
    //每隔一秒时间减一 并显示
    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);
        //显示
        spans[0].innerHTML = Math.floor(h/10);//小时的十位
        spans[1].innerHTML = Math.floor(h%10);
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = Math.floor(m%10);
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = Math.floor(s%10);
        if(time<=0){
            clearInterval(timer);//倒计时结束 定时器停止
        }

    },2000);

};


//轮播图

 //需求：
 //1、定时器切换轮播图
 //2、实现无缝滚动
 //3、角标同步
 //4、滑屏切换轮播图
function banner() {
    var ul = document.querySelector(".jd-banner ul");
    var banner = document.querySelector(".jd-banner");
    var W = banner.offsetWidth;//获取banner的宽度
    var index = 1;//当前切换图片的索引值

    //---------------复用代码-------
    //给ul添加过渡方法
    var addTransition = function () {
        ul.style.transition = "transform 0.4s";
        ul.style.webkitTransition = "transform 0.4s";
    }

    //给ul删除过渡方法
    var removeTransition = function () {
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }

    //让ul位移的方法
    var setTranslateX = function (translatex) {
        ul.style.transform = 'translateX('+translatex+'px)';
        ul.style.webkitTransform = 'translateX('+translatex+'px)';
    }

    //----------------1、定时器切换轮播图----------
    var timer = setInterval(function () {
        index++;//索引值累加
        addTransition();//添加过度
        var x = -index*W;//让ul位移 位移的距离 = -index*W
        setTranslateX(x);//让ul位移
    },1000);

    //----------------2.实现无缝滚动--------------
    //在每一屏切换完成后再作判断 transitionend

    //ul.addEventListener('transitionend', function () {
    //    //console.log(index);
    //    //判断index是否越界
    //    if(index>=9) {
    //        index=1;
    //        //删除过度
    //        removeTransition();
    //        //让ul快速跳转回来进行重合
    //        var x = -index*W;
    //        setTranslateX(x);//让ul快速位移
    //    }
    //
    //    if(index<=0){
    //        index=8;
    //        //删除过度
    //        removeTransition();
    //        //让ul快速跳转回来进行重合
    //        var x = -index*W;
    //        setTranslateX(x);//让ul快速位移
    //    }
    //})
    ////兼容webkit 复制上面一份 改成webkitTransitionend
    //ul.addEventListener('webkitTransitionend', function () {
    //    //console.log(index);
    //    //判断index是否越界
    //    if(index>=9) {
    //        index=1;
    //        //删除过度
    //        removeTransition();
    //        //让ul快速跳转回来进行重合
    //        var x = -index*W;
    //        setTranslateX(x);//让ul快速位移
    //    }
    //
    //    if(index<=0){
    //        index=8;
    //        //删除过度
    //        removeTransition();
    //        //让ul快速跳转回来进行重合
    //        var x = -index*W;
    //        setTranslateX(x);//让ul快速位移
    //    }
    //})

    //--------由于过度结束事件的兼容问题 造成代码冗余，需要解决
    /*
     *  可以实现 给一个盒子绑定兼容的过渡结束方法
     * obj：要绑定过度结束事件的盒子
     * callback ： 当obj的过度结束事件触发后 要执行的回调函数
     * */
    function bindTranstionEnd(obj,callback) {
        if(typeof  obj =='object'){
            obj.addEventListener('transitionend', function () {
                //if(callback) {//如果callback存在则执行callback
                //    callback();
                //}
                callback&&callback();
            });
            obj.addEventListener('webkitTransitionend', function () {
                callback&&callback();
            });
        }
    }
    //调用上面封装的过度结束事件的方法
    bindTranstionEnd(ul, function () {
        //判断index是否越界
        if(index>=9){
            index=1;
            //删除过度
            removeTransition();
            //让ul快速跳转回来进行重合
            var x = -index*W;
            setTranslateX(x);//让ul快速位移
        }
        if(index<=0){
            index=8;
            //删除过度
            removeTransition();
            //让ul快速跳转回来进行重合
            var x = -index*W;
            setTranslateX(x);//让ul快速位移
        }

        //代码执行到此处 index肯定是合法的 让角标同步
        setPoints(index);
    })


    //----------------3.角标跟随------------------
    function setPoints(index){
        //排他
        var points = document.querySelectorAll('.jd-banner ol li');
        for(var i=0;i<points.length;i++){
            points[i].classList.remove('active');
        }
        //给当前的添加active 图片有10个 小圆点8个
        points[index-1].classList.add('active');
    }


    //----------------4.滑屏切换轮播图-------------
    /*
    *1. 触屏开始 记录触屏的起始距离
    *2.触屏移动 记录移动的数据 并且让ul跟随触屏移动
    * 3.触屏结束 判断移动的距离差 决定是否切换图片
    *   3-1：如果distanceX>W/3 切换图片
    *       distanceX>0;上一张 index--
    *       distanceX<0;上一张 index++
    *   3-2:否则不切换图片
    * */

    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    banner.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].clientX;//获取起始数据
        clearInterval(timer);
    })
    banner.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].clientX;//获取移动的坐标值
        distanceX = moveX - startX;
        removeTransition();//删除过度效果
        //让ul跟随触屏移动 移动的距离= -index*W+distanceX
        setTranslateX(-index*W+distanceX);
    })
    banner.addEventListener('touchend', function (e) {
        if(Math.abs(distanceX)>W/3){
            //切换图片
            if(distanceX>0){
                //上一张
                index--;
            }
            if(distanceX<0){
                //小于0
                index++;
            }
        }else{
            //不切换图片
        }
        addTransition();//添加过度
        setTranslateX(-index*W);//让ul位移

        //数据重置
        startX = 0;
        moveX = 0;
        distanceX = 0;

        //再次开启定时器
        timer = setInterval(function () {
            index++;
            //索引值累加
            addTransition();//添加过渡
            var x=-index*W; //让ul位移  位移的距离= -index* W;
            setTranslateX(x); //让ul位移
        },2000)
    })

}


















