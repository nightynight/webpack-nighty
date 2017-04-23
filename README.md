# webpack-nighty
nighty前端框架

## 关于前端
首先需要node环境，具体步骤为：
##### 1)下载安装nodejs
node-v7.6.0-x64.msi
##### 2）设置环境变量
##### 3）设置npm registry为淘宝registry
npm config set registry https://registry.npm.taobao.org/
npm config list

#### 配置
进入src/config.js，修改BASE_URL相应端口

#### 配置好环境后用控制台进到项目目录，
运行
##### npm install webpack webpack-dev-server -g
再运行
##### npm start
启动程序，在浏览器中输入localhost:5000/page/home.html就可以看到页面。
