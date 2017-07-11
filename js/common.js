/**
 * Created by 鬼儿 on 2017/3/15.
 */
//alert(1);
/*解决思路：
 *   如果是点击事件
 *       手指接触屏幕，没有移动，并且接触屏幕时间较短
 *
 *  封装一个优化后的tap 用来代替点击事件
 *      obj：绑定tap事件的元素
 *      callback：点击事件触发后 的回调函数
 * */

/*
* 问题2：
*   定义在全局里面的变量和函数，很容易发生全局污染问题（覆盖）
* 解决方法：使用 命名空间
*
*
*
* */
//定义一个对象---命名空间
var itcast = {


    tap:function(obj,callback) {
        var startTime=0;
        var isMove=false;
        //首先判断数据合理性
        if(typeof obj=='object'){
            obj.addEventListener('touchstart', function () {
                startTime = Date.now();
            })
            obj.addEventListener('touchmove', function () {
                isMove = true;
            })
            obj.addEventListener('touchend', function (e) {
                if(!isMove&&Date.now()-startTime<150){
                    callback&&callback(e);//执行回调函数
                }
                //数据重置
                isMove = false;
                startTime = 0;
            })
        }
    }
}
//调用
//itcast.tap();



//function tap(obj,callback) {
//    var startTime = 0;
//    var isMove = false;
//    //首先判断数据合理性
//    if(typeof obj=='object'){
//        obj.addEventListener('touchstrat', function () {
//            startTime = Date.now();
//        })
//        obj.addEventListener('touchmove', function () {
//            isMove = true;
//        })
//        obj.addEventListener('touchend', function (e) {
//            if(!isMove && Date.now()-startTime<150){
//                callback && callback(e);//执行回调函数
//            }
//            //数据重置
//            isMove = true;
//            startTime = 0;
//        })
//    }
//}
