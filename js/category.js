/*Created by 鬼儿 on 2017/3/13.*/
//alert(1);
window.onload = function () {
    //左侧导航滑动
    swipeLeft();

    //右侧滑动
    swipeRight();
}

/*
* 左侧导航滑动
* 1、导航的li被点击
*   1-1：当前被点击的li变色
*   1-2：并且滚动到页面的顶部
* 2、触屏操作时：
*   2-1：触屏滑动时ul跟随
*   2-2：触屏结束后ul吸附回去
*
* */
function swipeLeft(){
    //alert(1);
    var leftBox = document.querySelector('.body-left');
    var ul = leftBox.querySelector('ul');
    var lis = ul.querySelectorAll('li');

    var currentY = 0;//用于记录ul位移的坐标Y值
    //---------临界值-----------------
    //定位临界值
    var maxTop = 0;
    var minTop = leftBox.offsetHeight-ul.offsetHeight;
    //滑动临界值
    var swipeMax = maxTop+150;
    var swipeMin = minTop-150;

    //--------封装复用代码-----------
    //添加过度
    var addTransition = function () {
        ul.style.transition = "transform 0.3s";
        ul.style.webkitTransition = "transform 0.3s";
    }
    //删除过度
    var removeTransition = function () {
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }
    //ul位移
    var setTranslateY = function (y) {
        ul.style.transform = 'translateY('+y+'px)';
        ul.style.webkitTransform = 'translateY('+y+'px)';
    }

    //--------------导航被点击的事件（给整个大盒子绑定事件，不给每个li绑了）-------------
    itcast.tap(leftBox, function (e) {
        //e.target 可以获取到触发事件最小的元素
        console.log(e.target.parentNode);//这是li
        var target = e.target.parentNode; //获取到当前点击的li标签
        //1-1：当前被点击的li变色 排他操作 让当前li有特殊样式
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('current');
            lis[i].index = i;//自定义索引值
        }
        target.classList.add('current');//突出自己

        //1-2:并且滚动到页面的顶部
        /*
        * 0     0
        * 1     -50
        * 2     -100
        * 3     -150    -index*50
        * */
        var top  = -target.index*50;//算出ul移动的距离
        //使用数据前要验证
        if(top>maxTop){
            top = maxTop;
        }
        if(top<minTop){
            top = minTop;
        }
        addTransition();//添加过渡
        setTranslateY(top);//让ul位移

        currentY = top;//记录ul的top值
    });

    //-----------2、触屏操作时------
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;

    leftBox.addEventListener('touchstart', function (e) {
        startY = e.targetTouches[0].clientY;//获取起始坐标值
    })
    //2-1:触屏滑动时 ul跟随滑动
    leftBox.addEventListener('touchmove', function (e) {
        moveY = e.targetTouches[0].clientY;//获取移动坐标值
        distanceY = moveY-startY;//距离差
        removeTransition();//删除过度
        var y = currentY + distanceY;
        //边界检测 验证数据合理性
        if(y>swipeMax){
            y=swipeMax;
        }
        if(y<swipeMin){
            y=swipeMin;
        }
        setTranslateY(y);//让ul位移 = 之前的位移 + distanceY
    })
    //2-2:触屏结束后ul吸附回去
    leftBox.addEventListener('touchend', function (e) {
        //在触屏结束后
        currentY = currentY+distanceY;
        //判断ul的位置是否越界（maxTop，minTop）
        if(currentY<=minTop){
            currentY = minTop;
        }
        if(currentY>=maxTop){
            currentY = maxTop;
        }
        addTransition();
        setTranslateY(currentY);

        //数据重置
        startY = 0;
        moveY = 0;
        distanceY = 0;

    })

}

//复制啊
function swipeRight(){
    //alert(1);
    var leftBox = document.querySelector('.body-right');
    var ul = leftBox.querySelector('.right-in');

    var currentY = 0;//用于记录ul位移的坐标Y值
    //---------临界值-----------------
    //定位临界值
    var maxTop = 0;
    var minTop = leftBox.offsetHeight-ul.offsetHeight;
    //滑动临界值
    var swipeMax = maxTop+150;
    var swipeMin = minTop-150;

    //--------封装复用代码-----------
    //添加过度
    var addTransition = function () {
        ul.style.transition = "transform 0.3s";
        ul.style.webkitTransition = "transform 0.3s";
    }
    //删除过度
    var removeTransition = function () {
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }
    //ul位移
    var setTranslateY = function (y) {
        ul.style.transform = 'translateY('+y+'px)';
        ul.style.webkitTransform = 'translateY('+y+'px)';
    }


    //-----------2、触屏操作时------
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;

    leftBox.addEventListener('touchstart', function (e) {
        startY = e.targetTouches[0].clientY;//获取起始坐标值
    })
    //2-1:触屏滑动时 ul跟随滑动
    leftBox.addEventListener('touchmove', function (e) {
        moveY = e.targetTouches[0].clientY;//获取移动坐标值
        distanceY = moveY-startY;//距离差
        removeTransition();//删除过度
        var y = currentY + distanceY;
        //边界检测 验证数据合理性
        if(y>swipeMax){
            y=swipeMax;
        }
        if(y<swipeMin){
            y=swipeMin;
        }
        setTranslateY(y);//让ul位移 = 之前的位移 + distanceY
    })
    //2-2:触屏结束后ul吸附回去
    leftBox.addEventListener('touchend', function (e) {
        //在触屏结束后
        currentY = currentY+distanceY;
        //判断ul的位置是否越界（maxTop，minTop）
        if(currentY<=minTop){
            currentY = minTop;
        }
        if(currentY>=maxTop){
            currentY = maxTop;
        }
        addTransition();
        setTranslateY(currentY);

        //数据重置
        startY = 0;
        moveY = 0;
        distanceY = 0;

    })

}