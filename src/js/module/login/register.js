/**
 * Created by chenchao on 17/4/16.
 */

$(function(){
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
    $("#username").blur(function () {
        $.ajax({
            type: 'POST',
            url: App.BASE_URL + "/static/isUsernameExist",
            data: {"username" : $("#username").val()},
            success: function (result) {
                if (result.type == "failure") {
                    //提示通过验证
                    $("#usernamePass").removeClass("gray");
                    $("#usernamePass").addClass("green");
                } else {
                    $("#usernamePass").removeClass("green");
                    $("#usernamePass").addClass("gray");
                }
            }
        });
    });

    $("#password").blur(function () {
        var checkNum = /.+/;
        if (checkNum.test($(this).val())) {
            $("#passwordPass").removeClass("gray");
            $("#passwordPass").addClass("green");
        } else {
            $("#passwordPass").removeClass("green");
            $("#passwordPass").addClass("gray");
        }
    });

    $("#passwordConfirm").blur(function () {
        if ($(this).val() == $("#password").val()) {
            $("#passwordConfirmPass").removeClass("gray");
            $("#passwordConfirmPass").addClass("green");
        } else {
            $("#passwordConfirmPass").removeClass("green");
            $("#passwordConfirmPass").addClass("gray");
        }
    });

    $("#register_form").submit(function(e){
        e.preventDefault();
        $("#btn_register").attr("disabled","disabled");

        var nickname = $("#nickname").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var passwordConfirm = $("#passwordConfirm").val();
        var email = $("#email").val();

        var encrypt = $.jCryption.crypt;
        encrypt.setPublicKey(publickKey);
        var encryptedPasswd = encrypt.encrypt(password);
        var encryptedPasswdConfirm = encrypt.encrypt(passwordConfirm);
        $.ajax({
            type: 'POST',
            url: App.BASE_URL + "/static/register",
            data: {
                sessionId: sessionId,
                nickname: nickname,
                username: username,
                password: encryptedPasswd,
                passwordConfirm: encryptedPasswdConfirm,
                email: email,
            },
            error: function () {
                $("#btn_register").attr("disabled",false);
                alert("请求失败");
            },
            success: function (result) {
                if (result.type == "success") {
                    var token = result.data.token;
                    storage.setItem('username',username);
                    storage.setItem('sessionId',sessionId);
                    storage.setItem('token',token);
                    window.location.href = App.WEB_ROOT + "page/home.html";
                } else {
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
                    $("#btn_register").attr("disabled",false);
                    $("#registerFailInfo").html(result.message);
                }
            }
        });
    });

});