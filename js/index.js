$(function(){
    // 创建一个mp3的播放器
    var audioDom = document.getElementById("audio");

    // 歌词解析
    function loadLrc(playIndex){
        // 设置播放音乐地址
        audioDom.src = "mp3/"+playIndex+".mp3";
        // 设置初始音量
        audioDom.volume = 0.5;
        // 获取textarea中间的歌词内容
        var lrc = $("#lrc").val();
        // 把时间和歌词分离出来
        var lrcArr = lrc.split("[");
        var html = "";
        for(var i = 0; i < lrcArr.length; i++){
            // 第二次分割
            var arr = lrcArr[i].split("]");
            // 取到歌词
            var message = arr[1];
            // 取到时间
            var timer = arr[0].split(".");
            // 取到分钟和秒
            var stime = timer[0].split(":");
            // 转换成秒数
            var ms = stime[0]*60 + stime[1]*1 - 1;
            if(message && ms > 0){
                html += "<li class='l_"+ms+"'><div class='l_text'>"+message+"</div><div class='l_cover'>"+message+"</div></li>";
            }
        }
        // 把解析好的歌词放入容器中
        $("#lyrics").html(html);
    }

    // 联动音乐播放歌词
    audioDom.addEventListener("timeupdate",function(){
        // 获取当前播放时间
        var timer = this.currentTime;
        // 解析音乐对应的时间
        var m = parseInt(timer / 60);
        var s = parseInt(timer);
        // 对应的时间选中歌词
        //$(".l_"+s).addClass("sel").siblings().removeClass("sel");
        var ms = ($(".l_"+s).find(".l_text").eq(0).text().length-2) || 7;
        $(".l_"+s).siblings().find(".l_cover").removeAttr("style");
        $(".l_"+s).addClass("sel").siblings().removeClass("sel").end().find(".l_cover").css("transition","width "+ms+"s linear").width("100%");

        // 联动滚动条自动滚动
        $(".l_con").scrollTop(($(".sel").index()-2)*24);
    });


    // 点击拖动进度条
    $(".t_center").mousedown(function(e){
        // 获取点击的位置
        var _this = $(this);
        // 获取鼠标的位置
        var x = e.clientX || e.pageX;
        // 获取起点的位置
        var left = _this.parent().offset().left;
        // 获取终点的位置
        var maxWidth = _this.parent().width();
        // 最大位置
        var w = x - left;
        // 根据点击位置除以最大的位置得到百分比
        var percent = (w / maxWidth) * 100;

        // 根据进度条赋值
        $(".c_played").width(percent+"%");
        $(".c_current").css("left",percent+"%");

        // 点击进度条的进度百分比 同步 音乐文件当前播放的时间的百分比
        audioDom.currentTime  = audioDom.duration * (w / maxWidth);

    });

    // 播放事件监听
    audioDom.ontimeupdate = function(){
        // 获取总时长
        var time = this.duration;
        // 获取播放时长
        var stime = this.currentTime;
        //格式化时间
        var ftime = formartTime(stime);
        // 赋值
        $(".t_left").text(ftime);
        // 获取播放的进度
        var pbit = stime / time;
        // 转换成百分比
        var percent = pbit * 100;

        $(".c_played").width(percent+"%");
        $(".c_current").css("left",percent+"%");
    }

    // 音乐播放结束
    audioDom.onended = function(){
        $(".p_next").trigger("click");
    }

    // 时间监听
    function timeEvent(){
        // 音频文件加载完毕监听
        audioDom.oncanplaythrough = function(){
            // 获取音乐文件总时间
            var time = this.duration;
            // 格式化时间
            var ftime = formartTime(time);
            // 赋值
            $(".t_right").text(ftime);
        }
    }

    // 音量拖动改变
    $(".a_current").mousedown(function(e){
        // 获取拖动对象
        var _this = $(this);
        // 获取鼠标的位置
        var x = e.clientX || e.pageX;
        // 获取拖动元素的起点位置
        var left = _this.position().left;
        // 获取拖动元素的终点位置
        var maxLeft = _this.parent().width();

        // 拖动元素开始
        $(document).mousemove(function(e){
            // 获取鼠标拖动最终位置
            var n = (e.clientX || e.pageX) - x + left;
            // 判断边界
            if(n < 0){
                n = 0;
            }
            if(n > maxLeft){
                n = maxLeft;
            }

            // 定位拖动进度最终位置
            _this.css("left",n);

            // 根据拖动的位置除以最大位置 获取百分比
            var percent = (n / maxLeft) * 100;
            // 跟进度条和拖动元素赋值
            $(".a_small").width(percent+"%");
            // 同步音乐文件的时间加载
            audioDom.volume = (n / maxLeft);
        }).mouseup(function(){
            // 移除事件
            $(document).unbind("mousemove");
            $(document).unbind("mouseup");
        });
    });

    // 音量点击控制
    $(".a_big").mousedown(function(e){
        // 获取点击位置
        var _this = $(this);
        // 获取鼠标的位置
        var x = e.clientX || e.pageX;
        // 获取起点位置
        var left = _this.parent().offset().left;
        // 获取终点的位置
        var maxWidth = _this.parent().width();
        // 最大值
        var w = x - left;
        // 根据点击位置除以最大位置 计算百分比
        var percent = (w / maxWidth) * 100;
        // 根据进度赋值
        $(".a_current").css("left",percent + "%");
        $(".a_small").width(percent + "%");
        // 同步音乐文件的加载时间
        audioDom.volume = (w / maxWidth);

    });

    //设置静音
    $(".v_trumpet").on("click",function(){
        $(this).toggleClass("v_trumpet v_sel");
        if(!$(this).hasClass("v_trumpet")){
            $(".a_current").css("left","0%");
            $(".a_small").width("0%");
            audioDom.volume = 0;
        } else {
            $(".a_current").css("left","40%");
            $(".a_small").width("40%");
            audioDom.volume = 0.4;
        }
    });


    // 定义格式化日期的函数
    function formartTime(time){
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);
        return (m < 10 ? "0" + m:m) + " : " + (s < 10 ? "0" + s : s);
    }

    // 获取音乐列表
    var children = $(".m_song").children();
    // 音乐列表的总长度
    var len = children.length;
    // 定义音乐列表
    var musicArr = [];
    // 定义数组下标
    var playIndex = -1;


    // 点击播放音乐
    children.each(function(){
        musicArr.push($(this).data("link"));
    }).on("click",function(){
        var $this = $(this);
        var title = $this.find(".l_t:first").text();
        $("#n_title").text(title);
        $this.addClass("selected").siblings().removeClass("selected");
        playIndex = $this.index();
        // 通过点击音乐列表中的某一行取到下标，在musicArr数组中对应取到相应的音乐地址，然后赋值
        audioDom.src = musicArr[playIndex];
        // 开始播放
        playMusic(playIndex);
    });

    // 播放音乐的方法
    function playMusic(playIndex){
        if (playIndex>=1) {
            $("#listbox").html("<b>暂无歌词</b>");
        }else{
            // 加载歌词
            loadLrc(playIndex);
        }
        // 播放音乐
        audioDom.play();
        // 播放暂停按钮切换
        $(".p_play").hide();
        $(".p_stop").show();

        // 设置播放状态图标
        children.eq(playIndex).find(".l_number span").addClass("n_num").parents(".s_list").siblings().find(".l_number span").removeClass("n_num");
        // 当前行选中
        children.eq(playIndex).addClass("selected").siblings().removeClass("selected");

        // 时间的监听
        timeEvent();

    }

    // 点击播放按钮
    $(".p_play").on("click",function(){
        // 默认播放第一首
        if(playIndex == -1){
            playIndex = 0;
            audioDom.src = musicArr[playIndex];
        }
        // 播放
        playMusic(playIndex);
    });

    // 播放器暂停
    $(".p_stop").on("click",function(){
        stopMusic();
    });

    // 暂停音乐
    function stopMusic(){
        // 暂停
        audioDom.pause();
        // 播放按钮切换
        $(".p_play").show();
        $(".p_stop").hide();
        children.removeClass("selected");
        children.eq(playIndex).find(".l_number span").removeClass("n_num");
    }

    // 下一首
    $(".p_next").on("click",function(){
        // 边界判断
        playIndex = (playIndex == (len-1) ? 0 : ++playIndex);
        // 赋值给播放地址
        audioDom.src = musicArr[playIndex];
        // 播放
        playMusic(playIndex);
    });

    // 上一首
    $(".p_pre").on("click",function(){
        // 边界判断
        playIndex = (playIndex <= 0 ? 0 : --playIndex);
        // 赋值播放地址
        audioDom.src = musicArr[playIndex];
        // 播放音乐
        playMusic(playIndex);
    });

    // 删除歌曲
    $(".l_del").click(function(){
        $(this).parents(".s_list").remove();
    });

    // 全选
    $("#all_check").click(function(){
         var all_suoyou = $("#c_music").find("input[type='checkbox']");
       if (all_suoyou[0].checked == true) {
            for (var i = 0; i < all_suoyou.length; i++) {
                all_suoyou[i].checked = true;
            };
       }else{
             for (var i = 0; i < all_suoyou.length; i++) {
                all_suoyou[i].checked = false;
            };
       }
    });
});