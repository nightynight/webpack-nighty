// import $ from 'jquery';
import Mustache from 'mustache';  //使用mustache模板引擎
import template from './Button.html';
import './Button.css';

// var Button = function (link, text) {
//     this.link = link;
//     this.text = text;
//     this.onClick = function (event) {
//         event.preventDefault();
//         alert(this.link);
//     };
//     this.render = function (nodeId) {
//         const text = this.text;
//
//         // Render our button
//         $("#" + nodeId).html(
//             Mustache.render(template, {text})
//         );
//
//         // Attach our listeners
//         $('.button').click(this.onClick.bind(this));
//     }
// };
export default class Button {
    constructor(link, text) {
        this.link = link;
        this.text = text;
    }

    onClick(event) {
        event.preventDefault();
        alert(this.link);
    }

    render(nodeId) {
        const text = this.text;

        // Render our button
        $("#" + nodeId).html(
            Mustache.render(template, {text})
        );

        // Attach our listeners
        $('.button').click(this.onClick.bind(this));
    }
}