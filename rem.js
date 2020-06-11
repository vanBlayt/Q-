window.onload=function(){
    //1、首次加载时，调用动态设置rem的api

    setRemSize();
    //2、当用户企图更改浏览器宽度 自动获取屏幕宽度，再计算rem赋值给根元素的font-size
    window.addEventListener('resize',setRemSize,false);//resize--浏览器宽度改变时触发
    /*window.onresize=function(){                                          // 
        setRemSize();
    }*/
    function setRemSize(){
        //在任何尺寸中都可以获得rem值
        //获得屏幕的宽度   rem=屏幕宽度/7.5+"px"
        var _clientWidth=document.documentElement.clientWidth/18.75+'px';
        // console.log(_clientWidth);
        //将得到的rem值复制给根元素的font-size
        document.documentElement.style.fontSize=_clientWidth;
    }

}