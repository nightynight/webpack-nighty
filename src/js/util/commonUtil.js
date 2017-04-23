(function( window, undefined ) {
    var CommonUtil = function(){
        /**
         * 生成随机字符串
         * @param count 字符串长度
         * @returns {string}
         */
        this.generateRandomString = function(count){
            var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            var res = "";
            for(var i = 0; i < count ; i ++) {
                var id = Math.ceil(Math.random()*35);
                res += chars[id];
            }
            return res;
        };

        /**
         * 生成唯一字符串
         * @returns {string} 一个18位的唯一字符串
         */
        this.generateOnlyString = function () {
            var date = new Date().getTime(); // 时间戳，13位
            var pre = this.generateRandomString(5);
            return pre + date;
        }
    };
    var CommonUtilInstance = new CommonUtil();
    window.CommonUtil = CommonUtilInstance;
})(window);