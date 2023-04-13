---
id: FrontEnd-Struct_Label
authors: Yakumo-Sue
title: 1. 互联网概述
---

 - 互联网: 数十亿网站的集合 为我们的生活提供了信息和服务
 - 网站: 每个网站类似于家庭  网站有地址  网站还有网页  若干个网页组成了网站
 - 网页: 类似于家庭中的成员 我们可以通过访问网站来查看网站中的每个网页 

## 浏览器

**浏览器是什么**

​	是浏览器互联网信息 查看文件的一个软件

**浏览器打开本地文件**

1. 文件格式是浏览器认识的格式 比如: html pdf 图片 
2. 双击 该文件 以html格式的文件为例

**如何在浏览器中查看网页源代码**

1. 打开网页

   ![image-20230413113016639](https://raw.githubusercontent.com/Yakumo-Sue/PicGo/main/images/202304131130735.png)

2. 鼠标在网页上右键单击 选择查看网页源代码

   ![image-20230413113037216](https://raw.githubusercontent.com/Yakumo-Sue/PicGo/main/images/202304131130240.png)

3. 或者 Ctrl + Shift + C 快捷键打开调试栏

   ![image-20230413113151847](https://raw.githubusercontent.com/Yakumo-Sue/PicGo/main/images/202304131131931.png)

### **主流浏览器**

- IE/Edge

  IE是微软公司旗下浏览器，是目国内用户量最多的浏览器。IE诞生于1994年，当时微软为了对抗市场份额占据将近百分之九十的网景Netscape Navigator，于是在Windows中开发了自己的浏览器Internet Explorer，自此也引发了第一次浏览器大战。结果可想而知，微软大获全胜，网景不得不将自己卖给AOL公司。但实际上事情并没有结束，网景后来开发了风靡一时的Firefox火狐，至今Firefox也成为世界五大浏览器之一。
  1996年，微软从Spyglass手里拿到Spyglass Mosaic的源代码和授权，开始开发自己的浏览器IE。后来，微软以IE和Windows捆绑的模式不断向市场扩展份额，使IE成为市场的绝对主流。现在装了Windows系统的电脑基本无法卸载IE。

- Chrome

  Chrome浏览器是google旗下的浏览器。Chrome浏览器至发布以来一直讲究简洁、快速、安全，所以Chrome浏览器到现在一直受人追捧。最开始Chrome采用webkit作为浏览器内核，直到2013年，google宣布不再使用苹果的webkit内核，开始使用webkit的分支内核Blink。

- Safari

  第二次浏览器大战是从苹果公司发布Safari浏览器开始的。2003年，苹果公司在苹果手机上开发Safari浏览器，利用自己得天独厚的手机市场份额使Safari浏览器迅速成为世界主流浏览器。Safari是最早使用webkit内核的浏览器也是现在苹果默认的浏览器。

- Opera

  Opera是挪威Opera Software ASA公司旗下的浏览器。1995年，opera公司发布第一版Opera浏览器，使用自己研发的Presto内核。当时opera公司的开发团队不断完善Presto内核，使Opera浏览器一度成为顶级浏览器。直到2016年奇虎360和昆仑万维收购了Oprea浏览器，从此也丢弃了强大的Presto内核，改用当时Google开源的webkit内核。后来Opera浏览器跟随Google将浏览器内核改为Blink内核。自此Presto内核也淡出了互联网市场。

- Firefox

  Firefox浏览器使Mozilla公司旗下浏览器，也是刚才提到的网景公司后来的浏览器。网景被收购后，网景人员创办了Mozilla基金会，这是一个非盈利组织，他们在2004年推出自己的浏览器Firefox。Firefox采用Gecko作为内核。Gecko是一个开源的项目，代码完全公开，因此受到很多人的青睐。Firefox的问世加快了第二次浏览器大战的开始。第二次浏览器大战与第一次二元鼎力的局面不同，这一次的特点就是百家争鸣，也自此打破了IE浏览器从98年网景被收购后独步浏览器市场的局面。

### 浏览器内核
也叫浏览器的渲染引擎  不同的浏览器内核对于同样的代码 显示的样子不一样。

1. IE浏览器内核：Trident内核，也是俗称的IE内核；
2. Chrome浏览器内核：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核；
3. Firefox浏览器内核：Gecko内核，俗称Firefox内核；
4. Safari浏览器内核：Webkit内核；
5. Opera浏览器内核：最初是自己的Presto内核，后来是Webkit，现在是Blink内核；
6. 360浏览器、猎豹浏览器内核：IE+Chrome双内核；
7. 搜狗、遨游、QQ浏览器内核：Trident（兼容模式）+Webkit（高速模式）；
8. 百度浏览器、世界之窗内核：IE内核；
9. 2345浏览器内核：以前是IE内核，现在也是IE+Chrome双内核；



## 网页标准

- HTML 结构标准                              模板引擎
- CSS  美化标准                                 less sass
- JavaScript 行为标准                       vue react

### HTML
超文本标记语言（英语：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。

您可以使用 HTML 来建立自己的 WEB 站点，HTML 运行在浏览器上，由浏览器来解析。

### Html基本结构

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



  ## Html 标签

  html标签总共有四部分组成:` <html lang="en">adsfasdf</html>`, 分别是开始标签`<html lang="en">` 结束标签`</html>` 内容 `adsfasdf` 属性: `lang="en"`

  ### html标签分类

- 单标签：只有开始标签没有结束标签 ` <meta/>` ` <input/>`  `<img/>`  在 HTML5 中 单标签的斜杠省略
- 双标签：有开始标签 有结束标签  `<div></div>` `<html></html>` `<body></body>` `<head></head>` 

  ### html标签的关系

- 嵌套关系 也叫父子关系：如果一个标签包含另外一个标签那就是父子、嵌套、 包含关系
- 并列关系 也叫兄弟关系：如果一个标签不包含另外一个标签那就是 并列、兄弟 关系、

  ### html标签的属性
- 语法: `<标签 属性名="属性值"></标签>`
- 属性分为html规定的属性(固有属性)和自己规定的属性(自定义属性)
- 属性名和属性值都必须小写 且用双引号包起来

### html中常用的标签

**在html中绝不允许 不用标签 直接写内容**

   语义化标签: 就是你看到这个标签 就明白它里面的内容属于哪一类
   - div 标签 --- 主要用来布局的 
   - span 标签 --- 你实在找不到标签可用的时候 用 span 写小东西的时候  比如图标 比如很少的文字

   - 标题标签
        
        ~~~html
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>标题标签</title>
        </head>
        
        <body>
        
            <h1> 一级标题标签 </h1>
            <h2> 二级标题标签 </h2>
            <h3> 三级标题标签 </h3>
            <h4> 四级标题标签 </h4>
            <h5> 五级标题标签 </h5>
            <h6> 六级标题标签 </h6>
        </body>
        
        </html>
        ~~~
        
        ![image-20230413140344659](https://raw.githubusercontent.com/Yakumo-Sue/PicGo/main/images/202304131403715.png)
  - 段落标签
    - `<p></p>`
  - 换行标签
    - `<br />` 是一个单标签 只能在 html 中使用 相当于 `\n`

  - 图片标签
    - `img` 标额外的属性有：src 、alt、title、width、height 

  - 超链接标签
    - `<a href="http://www.xxx.com">` 要跳转到哪里 可以是相对地址 也可以是网络地址



## 文件路径

  ### 绝对路径

绝对路径是指**目录下的绝对位置，直接到达目标位置，通常是从盘符开始的路径**。

  ### 相对路径(必须掌握)

相对路径就是指由这个文件所在的路径引起的跟其它文件（或文件夹）的路径关系。使用相对路径可以为我们带来非常多的便利。

    - ./ 从自己开始找 找平级
    - ../ 从自己的外层开始找 一个外层一个../



## CSS

**CSS** (Cascading Style Sheets，层叠样式表），是一种用来为结构化文档（如 HTML 文档或 XML 应用）添加样式（字体、间距和颜色等）的计算机语言，**CSS** 文件扩展名为 **.css**。

通过使用 **CSS** 我们可以大大提升网页开发的工作效率！

在我们的 **CSS** 教程中，您会学到如何使用 CSS 同时控制多重网页的样式和布局。

**CSS3** 现在已被大部分现代浏览器支持，而下一版的 **CSS4** 仍在开发中。

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
