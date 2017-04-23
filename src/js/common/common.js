(function( window, undefined ) {

    jQuery.fn.delay = function (time, func) {
        return this.each(function () {
            setTimeout(func, time);
        });
    };
    jQuery.fn.countDown = function (settings, to) {
        settings = jQuery.extend({
            startFontSize: '36px',
            endFontSize: '36px',
            duration: 1000,
            startNumber: 10,
            endNumber: 0,
            callBack: function () { }
        }, settings);
        return this.each(function () {
            if (!to && to != settings.endNumber) { to = settings.startNumber; }
            //设定倒计时开始的号码
            $(this).text(to);
            //页面动画
            $(this).animate({
                'font': settings.startFontSize
            }, settings.duration, '', function () {
                if (to > settings.endNumber) {
                    $(this).text(to - 1).countDown(settings, to - 1);
                }
                else {
                    settings.callBack(this);
                }
            });
        });
    };

})(window);