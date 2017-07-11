/**
 * Created by 鬼儿 on 2017/3/14.
 */
//alert(1);

window.onload = function () {
    var dels = document.querySelectorAll('.option .del');
    var winBox = document.querySelector('.winBox');
    var delBox = document.querySelector('.delbox');
    var cancel = document.querySelector('.cancel');
    //给页面中所有的垃圾桶（删除按钮）绑定点击事件
    for(var i=0;i<dels.length;i++){
        dels[i].onclick = function () {
            this.classList.add('open');//桶盖打开
            winBox.style.display='block';//模态框显示
            delBox.classList.add('animated');//添加动画效果-调用动画库
            delBox.classList.add('bounceInDown');//动画库插件中的类名
        }
    }
    //当点击取消按钮后 模态框消失 桶盖关闭 动画类名去掉
    cancel.onclick = function () {
        winBox.style.display='none';//模态框消失
        delBox.classList.remove('animated');
        delBox.classList.remove('bounceInDown');
        //找到有open类名的盒子 删除open类名
        document.querySelector('.open').classList.remove('open');//取消后盖上桶盖
    }
}