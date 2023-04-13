---
sidebar_position: 1
---

# 1. 互联网概述

 - 互联网: 数十亿网站的集合 为我们的生活提供了信息和服务
 - 网站: 每个网站类似于家庭  网站有地址  网站还有网页  若干个网页组成了网站
 - 网页: 类似于家庭中的成员 我们可以通过访问网站来查看网站中的每个网页 

## 浏览器

### 浏览器是什么

    是浏览器互联网信息 查看文件的一个软件

### 浏览器打开本地文件

    1. 文件格式是浏览器认识的格式 比如: html pdf 图片 
    2. 双击 该文件 以html格式的文件为例

### 如何在浏览器中查看网页源代码

    1.打开网页
    2.鼠标在网页上右键单击 选择查看网页源代码

### 主流浏览器(https://liulanmi.com)

    chrome  ie/edge  firefox Opera  safari
    
    chrome是我们上课用的

### 浏览器内核
    也叫浏览器的渲染引擎  不同的浏览器内核对于同样的代码 显示的样子不一样
    
    - safari          Webkit内核
    - chrome(opera))  Blink内核
    - ie              Trident内核
    - firefox         Gecko内核


## 网页标准

- HTML 结构标准  相当于人的骨骼                             模板引擎
- CSS  美化标准  相当于人的皮肤 衣服                        less sass
- JavaScript 行为标准 相当于人的思考灵魂                    vue react

### HTML
  html是来控制网页内容的

  html基本结构
  ```html
  <!DOCTYPE html>
<!-- html是根标签 root标签 根元素 html标签 -->
<!-- lang 代表语言 现在的语言是英语  -->
<!-- lang="zh-cn"  lang="fr" -->
<!-- lang="en"代表是的html中的属性  语法: 属性名="属性值" -->
<html lang="en">

<!-- head标签中的内容是给浏览器用的 -->

<head>
  <!-- meta也是一个标签  -->
  <!-- charset="UTF-8" 是编码格式 现在编码除了以后学的现在一般不会出现编码格式问题 全部统一 UTF-8 -->
  <meta charset="UTF-8">
  <!--  下面的属性viewport 是专门用来做手机网页的 适配各种手机方法的一部分代码 现在不用管 到了移动端布局会讲 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 让有edge浏览器的电脑 按照edge的内核的方式渲染网页 没有edge的电脑  那就相当于白写 -->
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- 告诉浏览器(更准确的说是给搜索引擎(获取网页信息的软件)))这个网页的标题是什么 让别人容易在百度 google中能轻易的搜到  -->
  <!-- 同时也是网页的标题 显示在tab页中 -->
  <title>第一个网页</title>
</head>
<!-- body中的内容是我们写代码的主要区域 -->
<body>
 
</body>

</html>
  ```

  ## html标签

  html标签总共有四部分组成:` <html lang="en">adsfasdf</html>`, 分别是开始标签`<html lang="en">` 结束标签`</html>` 内容 `adsfasdf` 属性: `lang="en"`

  ### html标签分类

    - 单标签: 只有开始标签没有结束标签 <meta/> <input/>  <img/>  在HTML5中 单标签的斜杠省略
    - 双标签  有开始标签 有结束标签  div html body head 

  ### html标签的关系

    - 嵌套关系 也叫父子关系  如果一个标签包含另外一个标签那就是父子 || 嵌套 || 包含关系
    - 并列关系 也叫兄弟关系  如果一个标签 不包含另外一个标签那就是 并列 || 兄弟 关系、

  ### html标签的属性
    - 语法: <标签 属性名="属性值"></标签>
    - 属性分为html规定的属性(固有属性)和自己规定的属性(自定义属性)
    - 属性名和属性值都必须小写 且用双引号包起来、

## html中常用的标签(在html中绝不允许 不用标签 直接写内容)
   语义化标签: 就是你看到这个标签 就明白它里面的内容属于哪一类
   - div标签 --- 主要用来布局的 
   - span标签 --- 你实在找不到标签可用的时候 用span  写小东西的时候  比如图标 比如很少的文字

   - 标题标签
        - h1  最大的标题 一个页面中只允许存在一个h1
        - h2
        - h3
        - h4
        - h5
        - h6
  - 段落标签  paragraph
    - p
  - 换行标签
    - br 是一个单标签 只能在html中使用 相当于 \n

  - 图片标签
    - img标签 src  alt  title width height 

  - 超链接标签
    - a  href 要跳转到哪里 可以是相对地址 也可以是网络地址

## 文件路径
  ### 绝对路径(知道就可以了)
  ### 相对路径(必须掌握)
    - ./ 从自己开始找 找平级
    - ../ 从自己的外层开始找 一个外层一个../

## CSS3

  为了让网页更加好看 美观 体验好 学习CSS3

  - 行内样式
```html
 <标签 style="css属性名: 属性值;css属性名: 属性值;..."></标签>
```

  - 内嵌样式(学习中)
```html
  <!-- 在head标签中 写style标签 -->
  标签名 {
    css属性名: 属性值;
    css属性名: 属性值;
    css属性名: 属性值;
  }
```

  - 外链样式(项目中)

```html
    <link rel="stylesheet" href="文件路径">
```

## 案例 - 微博

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    .theBody{
        width: 50%;
        margin: 0px auto;
        text-align: center;
        border-top: 2px solid rgba(9, 70, 131,10);
        border-left: 1px solid gray;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
    }
    .text_long{
        color:#bdbdbd;
    }
    .text_short{
        color: #9d0c0c;
    }
    .text_num{
        color: #9d0c0c;
    }

</style>

<body>

<div class="theBody">
    <div>
        <span><h2><strong>鲁能热身赛16-0大胜业余队 野牛4球蒙蒂略戴帽</strong></h2></span>
    </div>
    <div>
        <h6 class="text_long">2015年08月08日18:19 <span class="text_short">新浪体育</span> 微博 我有话说 (<span class="text_num">10,370</span>人参与) 收藏本文</h6>
    </div>
    <div>
        <hr width="80%">
    </div>
    <div>
        <img src="../html/images/tiyu.png"/>
    </div>
    <div>
        <h5>鲁能热身赛16-0大胜</h5>
    </div>
</div>
</body>
</html>
~~~

![image-20230413112150764](https://raw.githubusercontent.com/Yakumo-Sue/PicGo/main/images/image-20230413112150764.png)

## 案例 - 百度

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<style>
    .title1 {
        text-align: center;
        
    }

    .title2 {
        text-align: center;
        line-height: 500%;
    }

    .title3 {
        text-align: center;
        line-height: 300%;
    }


    .title4 {
        text-align: center;
        line-height: 700%;
    }

    .title5 {
        text-align: center;
        line-height: 200%;
    }

</style>

<body>

  

        <div class="title1">
            <img src="../html/images/bdlogo.gif" />
        </div>

        <div class="title2">
            <span>
                <a href="">新闻</a>
                <strong>网页</strong>
                <a href="">贴吧</a>
                <a href="">知道</a>
                <a href="">音乐</a>
                <a href="">图片</a>
                <a href="">视频</a>
                <a href="">地图</a>
            </span>
        </div>


        <div class="title3">
            <span>
                <a href="">百科</a>
                <a href="">文库</a>
                <a href="">hao123</a>
                <a href="">更多>></a>
            </span>
        </div>


        <div class="title4">
            <span>
                <a href=""><img src="../html/images/ic.jpg" alt="">百度地图带你吃喝玩乐,全心全意为人民服务</a>
            </span>
        </div>


        <div class="title5">
            <span>
                <a href="">把百度设为主页 安装百度卫士</a>
            </span>

            <br/>

            <span>
                <a href="">加入百度推广</a> |

                <a href="">搜索风云榜</a> |

                <a href="">关于百度</a> |

                <a href="">About Baidu</a>
            </span>
        
            <br/>

            <span>&copy 2013 Baidu 使用百度前必读 京ICP证030173号</span>
        </div>

</body>

</html>
~~~

![image-20230413112232583](https://raw.githubusercontent.com/Yakumo-Sue/PicGo/main/images/image-20230413112232583.png)
