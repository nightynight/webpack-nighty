/**
 * Created by chenchao on 17/4/16.
 */

$(function () {
    var storage = window.localStorage;
    var sessionId = CommonUtil.generateOnlyString();
    var publickKey;

    $.ajax({
        type: 'GET',
        url: App.BASE_URL + "/static/getPublicKey?sessionId=" + sessionId,
        error: function () {
            alert("请求失败");
        },
        success: function (result) {
            if (result.type == "success") {
                publickKey = result.message;
            }
        }
    });


    $("#login_form").submit(function (e) {
        e.preventDefault();
        $("#btn_login").attr("disabled","disabled");
        var username = $("#username").val();
        var password = $("#password").val();
        var encrypt = $.jCryption.crypt;  //使用该对象来实现加密
        encrypt.setPublicKey(publickKey);//设置密钥
        var encryptedPasswd = encrypt.encrypt(password);//加密密码
        $.ajax({
            type: 'POST',
            url: App.BASE_URL + "/static/login",
            data: {
                sessionId: sessionId,
                username: username,
                password: encryptedPasswd,
                keepPassword: $("#keepPassword").is(':checked'),
            },
            error: function () {
                $("#btn_login").attr("disabled",false);
                alert("请求失败");
            },
            success: function (result) {
                if (result.type == "success") {
                    console.log(result);
                    var token = result.data.token;
                    storage.setItem('username',username);
                    storage.setItem('sessionId',sessionId);
                    storage.setItem('token',token);
                    if ($("#keepPassword").is(':checked')){
                        storage.setItem('keepPassword',true);
                    } else {
                        storage.removeItem('keepPassword');
                    }
                    var roles = result.data.roles;
                    //判断roles中有没有admin
                    for (var i = 0; i < roles.length; i++){
                        if (roles[i].type == "admin"){
                            window.location.href = App.WEB_ROOT + "page/module/admin/home.html";
                            return;
                        }
                    }
                    window.location.href = App.WEB_ROOT + "page/home.html";
                } else {
                    storage.removeItem('sessionId');
                    storage.removeItem('token');
                    storage.removeItem('keepPassword');
                    $.ajax({
                        type: 'GET',
                        url: App.BASE_URL + "/static/getPublicKey?sessionId=" + sessionId,
                        error: function () {
                            alert("请求失败");
                        },
                        success: function (result) {
                            if (result.type == "success") {
                                publickKey = result.message;
                            }
                        }
                    });
                    $("#btn_login").attr("disabled",false);
                    $("#loginFailInfo").html(result.message);
                }
            }
        });
    });
});