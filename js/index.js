/**
 * Created by ��� on 2017/3/12.
 */
//alert(1);
window.onload = function () {
    //ͷ��������ɫ
    setHeader();

    //����ʱ
    downTime();

    //�ֲ�ͼ
    banner();

}



//��ҳ�����ʱ header��ɫ
//��ҳ������߶�С��banner�߶�ʱ��header͸���ȷ����仯
//��ҳ������߶ȴ���banner�߶�ʱ��header͸�����ǹ̶���
//͸���ȵ�ȡֵ=ҳ�����/banner�ĸ߶�
function setHeader(){
    var banner = document.querySelector('.jd-banner');
    var H = banner.offsetHeight;//��ȡbanner�ĸ߶�
    var headerIn = document.querySelector('.header-in');
    var opacity = 0;

    window.onscroll = function () {
        var top = document.body.scrollTop;//ҳ��ͷ������ȥ�ĸ߶�
        console.log(top);
        opacity = top/H;
        //��֤͸���Ȳ�����0.85
        if(opacity>0.85){
            opacity = 0.85;
        }
        //��͸���ȵ�ֵ��ֵ��header-in
        headerIn.style.background = 'rgba(201, 21, 35, '+opacity+')';//������""
    };
};


//����ʱ
function downTime() {
    var time = 5*60*60;
    var spans = document.querySelectorAll(".sk-time span");
    //ÿ��һ��ʱ���һ ����ʾ
    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);
        //��ʾ
        spans[0].innerHTML = Math.floor(h/10);//Сʱ��ʮλ
        spans[1].innerHTML = Math.floor(h%10);
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = Math.floor(m%10);
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = Math.floor(s%10);
        if(time<=0){
            clearInterval(timer);//����ʱ���� ��ʱ��ֹͣ
        }

    },2000);

};


//�ֲ�ͼ

 //����
 //1����ʱ���л��ֲ�ͼ
 //2��ʵ���޷����
 //3���Ǳ�ͬ��
 //4�������л��ֲ�ͼ
function banner() {
    var ul = document.querySelector(".jd-banner ul");
    var banner = document.querySelector(".jd-banner");
    var W = banner.offsetWidth;//��ȡbanner�Ŀ��
    var index = 1;//��ǰ�л�ͼƬ������ֵ

    //---------------���ô���-------
    //��ul��ӹ��ɷ���
    var addTransition = function () {
        ul.style.transition = "transform 0.4s";
        ul.style.webkitTransition = "transform 0.4s";
    }

    //��ulɾ�����ɷ���
    var removeTransition = function () {
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }

    //��ulλ�Ƶķ���
    var setTranslateX = function (translatex) {
        ul.style.transform = 'translateX('+translatex+'px)';
        ul.style.webkitTransform = 'translateX('+translatex+'px)';
    }

    //----------------1����ʱ���л��ֲ�ͼ----------
    var timer = setInterval(function () {
        index++;//����ֵ�ۼ�
        addTransition();//��ӹ���
        var x = -index*W;//��ulλ�� λ�Ƶľ��� = -index*W
        setTranslateX(x);//��ulλ��
    },1000);

    //----------------2.ʵ���޷����--------------
    //��ÿһ���л���ɺ������ж� transitionend

    //ul.addEventListener('transitionend', function () {
    //    //console.log(index);
    //    //�ж�index�Ƿ�Խ��
    //    if(index>=9) {
    //        index=1;
    //        //ɾ������
    //        removeTransition();
    //        //��ul������ת���������غ�
    //        var x = -index*W;
    //        setTranslateX(x);//��ul����λ��
    //    }
    //
    //    if(index<=0){
    //        index=8;
    //        //ɾ������
    //        removeTransition();
    //        //��ul������ת���������غ�
    //        var x = -index*W;
    //        setTranslateX(x);//��ul����λ��
    //    }
    //})
    ////����webkit ��������һ�� �ĳ�webkitTransitionend
    //ul.addEventListener('webkitTransitionend', function () {
    //    //console.log(index);
    //    //�ж�index�Ƿ�Խ��
    //    if(index>=9) {
    //        index=1;
    //        //ɾ������
    //        removeTransition();
    //        //��ul������ת���������غ�
    //        var x = -index*W;
    //        setTranslateX(x);//��ul����λ��
    //    }
    //
    //    if(index<=0){
    //        index=8;
    //        //ɾ������
    //        removeTransition();
    //        //��ul������ת���������غ�
    //        var x = -index*W;
    //        setTranslateX(x);//��ul����λ��
    //    }
    //})

    //--------���ڹ��Ƚ����¼��ļ������� ��ɴ������࣬��Ҫ���
    /*
     *  ����ʵ�� ��һ�����Ӱ󶨼��ݵĹ��ɽ�������
     * obj��Ҫ�󶨹��Ƚ����¼��ĺ���
     * callback �� ��obj�Ĺ��Ƚ����¼������� Ҫִ�еĻص�����
     * */
    function bindTranstionEnd(obj,callback) {
        if(typeof  obj =='object'){
            obj.addEventListener('transitionend', function () {
                //if(callback) {//���callback������ִ��callback
                //    callback();
                //}
                callback&&callback();
            });
            obj.addEventListener('webkitTransitionend', function () {
                callback&&callback();
            });
        }
    }
    //���������װ�Ĺ��Ƚ����¼��ķ���
    bindTranstionEnd(ul, function () {
        //�ж�index�Ƿ�Խ��
        if(index>=9){
            index=1;
            //ɾ������
            removeTransition();
            //��ul������ת���������غ�
            var x = -index*W;
            setTranslateX(x);//��ul����λ��
        }
        if(index<=0){
            index=8;
            //ɾ������
            removeTransition();
            //��ul������ת���������غ�
            var x = -index*W;
            setTranslateX(x);//��ul����λ��
        }

        //����ִ�е��˴� index�϶��ǺϷ��� �ýǱ�ͬ��
        setPoints(index);
    })


    //----------------3.�Ǳ����------------------
    function setPoints(index){
        //����
        var points = document.querySelectorAll('.jd-banner ol li');
        for(var i=0;i<points.length;i++){
            points[i].classList.remove('active');
        }
        //����ǰ�����active ͼƬ��10�� СԲ��8��
        points[index-1].classList.add('active');
    }


    //----------------4.�����л��ֲ�ͼ-------------
    /*
    *1. ������ʼ ��¼��������ʼ����
    *2.�����ƶ� ��¼�ƶ������� ������ul���津���ƶ�
    * 3.�������� �ж��ƶ��ľ���� �����Ƿ��л�ͼƬ
    *   3-1�����distanceX>W/3 �л�ͼƬ
    *       distanceX>0;��һ�� index--
    *       distanceX<0;��һ�� index++
    *   3-2:�����л�ͼƬ
    * */

    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    banner.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].clientX;//��ȡ��ʼ����
        clearInterval(timer);
    })
    banner.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].clientX;//��ȡ�ƶ�������ֵ
        distanceX = moveX - startX;
        removeTransition();//ɾ������Ч��
        //��ul���津���ƶ� �ƶ��ľ���= -index*W+distanceX
        setTranslateX(-index*W+distanceX);
    })
    banner.addEventListener('touchend', function (e) {
        if(Math.abs(distanceX)>W/3){
            //�л�ͼƬ
            if(distanceX>0){
                //��һ��
                index--;
            }
            if(distanceX<0){
                //С��0
                index++;
            }
        }else{
            //���л�ͼƬ
        }
        addTransition();//��ӹ���
        setTranslateX(-index*W);//��ulλ��

        //��������
        startX = 0;
        moveX = 0;
        distanceX = 0;

        //�ٴο�����ʱ��
        timer = setInterval(function () {
            index++;
            //����ֵ�ۼ�
            addTransition();//��ӹ���
            var x=-index*W; //��ulλ��  λ�Ƶľ���= -index* W;
            setTranslateX(x); //��ulλ��
        },2000)
    })

}


















