/**
 * Created by ��� on 2017/3/15.
 */
//alert(1);
/*���˼·��
 *   ����ǵ���¼�
 *       ��ָ�Ӵ���Ļ��û���ƶ������ҽӴ���Ļʱ��϶�
 *
 *  ��װһ���Ż����tap �����������¼�
 *      obj����tap�¼���Ԫ��
 *      callback������¼������� �Ļص�����
 * */

/*
* ����2��
*   ������ȫ������ı����ͺ����������׷���ȫ����Ⱦ���⣨���ǣ�
* ���������ʹ�� �����ռ�
*
*
*
* */
//����һ������---�����ռ�
var itcast = {


    tap:function(obj,callback) {
        var startTime=0;
        var isMove=false;
        //�����ж����ݺ�����
        if(typeof obj=='object'){
            obj.addEventListener('touchstart', function () {
                startTime = Date.now();
            })
            obj.addEventListener('touchmove', function () {
                isMove = true;
            })
            obj.addEventListener('touchend', function (e) {
                if(!isMove&&Date.now()-startTime<150){
                    callback&&callback(e);//ִ�лص�����
                }
                //��������
                isMove = false;
                startTime = 0;
            })
        }
    }
}
//����
//itcast.tap();



//function tap(obj,callback) {
//    var startTime = 0;
//    var isMove = false;
//    //�����ж����ݺ�����
//    if(typeof obj=='object'){
//        obj.addEventListener('touchstrat', function () {
//            startTime = Date.now();
//        })
//        obj.addEventListener('touchmove', function () {
//            isMove = true;
//        })
//        obj.addEventListener('touchend', function (e) {
//            if(!isMove && Date.now()-startTime<150){
//                callback && callback(e);//ִ�лص�����
//            }
//            //��������
//            isMove = true;
//            startTime = 0;
//        })
//    }
//}
