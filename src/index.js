require('./js/common/publicRequire.js');

import Button from './component/common/Button/Button';
import Header from './component/Header/Header';
var Component = {
    MyButton: Button,
    Header,
};
window.Component = Component;

