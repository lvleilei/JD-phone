/**
 * Created by ��� on 2017/3/14.
 */
//alert(1);

window.onload = function () {
    var dels = document.querySelectorAll('.option .del');
    var winBox = document.querySelector('.winBox');
    var delBox = document.querySelector('.delbox');
    var cancel = document.querySelector('.cancel');
    //��ҳ�������е�����Ͱ��ɾ����ť���󶨵���¼�
    for(var i=0;i<dels.length;i++){
        dels[i].onclick = function () {
            this.classList.add('open');//Ͱ�Ǵ�
            winBox.style.display='block';//ģ̬����ʾ
            delBox.classList.add('animated');//��Ӷ���Ч��-���ö�����
            delBox.classList.add('bounceInDown');//���������е�����
        }
    }
    //�����ȡ����ť�� ģ̬����ʧ Ͱ�ǹر� ��������ȥ��
    cancel.onclick = function () {
        winBox.style.display='none';//ģ̬����ʧ
        delBox.classList.remove('animated');
        delBox.classList.remove('bounceInDown');
        //�ҵ���open�����ĺ��� ɾ��open����
        document.querySelector('.open').classList.remove('open');//ȡ�������Ͱ��
    }
}