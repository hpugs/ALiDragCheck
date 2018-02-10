$.fn.drag = function (options) {
    //isMove:�Ƿ��ڻ�����manageMove�����Ƿ����
    var x, drag = this, isMove = false, manageMove = true, defaults = {};
    var options = $.extend(defaults, options);
    //��ӱ��������֣����� 
    var html = '<div class="drag_bg"></div>' +
            '<div class="drag_text" onselectstart="return false;" unselectable="on">�϶�������֤</div>' +
            '<div class="handler"><span class="handler_bg"></span></div>' +
			'<input type="hidden" name="resultData" id="resultData" />';
    this.html(html);

    var handler = drag.find('.handler');
    var drag_bg = drag.find('.drag_bg');
    var text = drag.find('.drag_text');
    var resultData = drag.find('#resultData');
    var maxWidth = drag.width() - handler.width();  //�ܻ���������� 

    //��갴��ʱ���x���λ�� 
    handler.mousedown(function (e) {
        isMove = true;
        x = e.pageX - parseInt(handler.css('left'), 10);
    });

    //���ָ�����������ƶ�ʱ���ƶ��������0С������࣬����x��λ�õ�������ƶ����� 
    $(document).mousemove(function (e) {
        var _x = e.pageX - x;
        if (isMove && manageMove) {
            if (_x > 0 && _x <= maxWidth) {
                handler.css({ 'left': _x });
                drag_bg.css({ 'width': _x });
            } else if (_x > maxWidth) {  //���ָ���ƶ�����ﵽ���ʱ����¼� 
                manageMove = false;
                handler.css({ 'left': maxWidth - 2 });
                drag_bg.css({ 'width': maxWidth - 2 });
                dragOk();
            }
        }
    }).mouseup(function (e) {
        if (manageMove) {
            isMove = false;
            var _x = e.pageX - x;
            if (_x < maxWidth) { //����ɿ�ʱ�����û�дﵽ������λ�ã�����ͷ��س�ʼλ�� 
                handler.css({ 'left': 0 });
                drag_bg.css({ 'width': 0 });
            }
        }
    });
 
    //����¼� 
    function dragOk() {
        handler.children().removeClass('handler_bg').addClass('handler_ok_bg'); 
        text.text('��֤ͨ��'); 
        drag.css({'color': '#fff'}); 
        handler.unbind('mousedown'); 
        $(document).unbind('mousemove'); 
        $(document).unbind('mouseup');
		alert("��֤�ɹ�");
    } 
};