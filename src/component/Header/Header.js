/**
 * Created by chenchao on 17/4/15.
 */

import Mustache from 'mustache';  //使用mustache模板引擎
import template from './Header.html';
import './Header.css';

export default class Header {
    constructor(nickname) {
        if (nickname){ //已经登录
            this.isLogin = true;
            this.nickname = nickname;
        }
        else {
            this.isLogin = false;
        }
    }

    render(nodeId) {
        const nickname = this.nickname;

        // Render our button
        $("#" + nodeId).html(
            Mustache.render(template, {})
        );

        var tag;
        if(this.isLogin){
            tag = $("<span class=\"fa fa-bell-o\" style=\"margin-right: 20px;\"></span>\n" +
                "    <span class=\"inlineBlock dropdown\">\n" +
                "        <a href=\"##\" data-toggle=\"dropdown\" class=\"dropdown-toggle\">\n" +
                "            <span class=\"fa fa-user-o\">&nbsp;\n" +
                "                <span id=\"nickname\">" + nickname + "</span>&nbsp;\n" +
                "                <span class=\"fa fa-sort-down\"></span>\n" +
                "            </span>\n" +
                "        </a>\n" +
                "        <ul class=\"dropdown-menu\">\n" +
                "            <li><a href=\"##\" id=\"head_logout\" class=\"\">退出登录</a></li>\n" +
                "        </ul>\n" +
                "    </span>");

            $("#header-userInfo").append(tag);

            $("#head_logout").click(function () {
                var storage = window.localStorage;
                var sessionId = storage.getItem('sessionId');
                var username = storage.getItem('username');
                storage.removeItem('sessionId');
                storage.removeItem('token');
                storage.removeItem('keepPassword');
                $.ajax({
                    type: 'POST',
                    url: App.BASE_URL + "/static/logout",
                    data: {
                        username: username,
                        sessionId: sessionId,
                    }
                });
                window.location.href = App.WEB_ROOT + "page/module/login/login.html";
            }.bind(this));
        }
        else {
            tag = $("<button class=\"btn btn-success\" id=\"head_login\">登录</button>\n" +
                "    <button class=\"btn btn-success\" id=\"head_register\">注册</button>");

            $("#header-userInfo").append(tag);

            $("#head_login").click(function () {
                window.location.href = App.WEB_ROOT + "page/module/login/login.html";
            }.bind(this));
            $("#head_register").click(function () {
                window.location.href = App.WEB_ROOT + "page/module/login/register.html";
            }.bind(this));
        }

    }
}

