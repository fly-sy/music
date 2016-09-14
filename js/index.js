$(function(){
    // 创建一个mp3的播放器
    var audioDom = document.createElement("audio");

    // 歌词解析
    function loadLrc(playIndex){
        // 设置播放音乐地址
        audioDom.src = "mp3/"+playIndex+".mp3";
        // 设置初始音量
        audioDom.volume = 0.5;
        // 获取歌词
        var lrc = getLrc(playIndex);
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
            // if(message){
                html += "<li class='l_"+ms+"'><div class='l_text'>"+message+"</div><div class='l_cover'>"+message+"</div></li>";
            }
        }
        // 把解析好的歌词放入容器中
        $("#lyrics").html(html);
    }

    //取得歌词
    function getLrc(s){
        var lrc = "";
        if (s == "0") {
            lrc='[ti:] [ar:] [al:] [offset:0] [00:00.00]歌名：相亲相爱一家人 [00:01.16]演唱：群星 [00:02.61] [00:03.52]我喜欢一回家 [00:07.12]就有暖洋洋的灯光在等待 [00:11.23]我喜欢一起床 [00:14.59]就看到大家微笑的脸庞 [00:18.71]我喜欢一出门 [00:21.51]就为了家人和自己的理想打拼 [00:25.85]我喜欢一家人 [00:27.55]心朝着同一个方向眺望 [00:31.58]哦！ [00:33.47]我喜欢快乐时 [00:36.87]马上就想要和你一起分享 [00:40.61]我喜欢受伤时 [00:43.98]就想起你们温暖的怀抱 [00:48.12]我喜欢生气时 [00:51.02]就想到你们永远包容多么伟大 [00:55.07]我喜欢旅行时 [00:57.08]为你把美好记忆带回家 [01:02.45]因为我们是一家人 [01:06.42]相亲相爱的一家人 [01:09.95]有缘才能相聚 [01:11.97]有心才会珍惜 [01:13.68]何必让满天乌云遮住眼睛 [01:17.45]因为我们是一家人 [01:21.19]相亲相爱的一家人 [01:24.95]有福就该同享 [01:26.59]有难必然同当 [01:28.47]用相知相守换地久天长 [01:32.61] [01:41.43]我喜欢一回家 [01:45.04]就把乱糟糟的心情都忘掉 [01:49.03]我喜欢一起床 [01:52.40]就带给大家微笑的脸庞 [01:56.44]我喜欢一出门 [01:59.48]就为了个人和世界的美好打拼 [02:03.41]我喜欢一家人 [02:05.31]梦朝着同一个方向创造 [02:09.44]哦！ [02:11.38]当别人快乐时 [02:14.50]好像是自己获得幸福一样 [02:18.76]当别人受伤时 [02:22.04]我愿意敞开最真的怀抱 [02:26.11]当别人生气时 [02:28.94]告诉他就算观念不同不必激动 [02:33.24]当别人需要时 [02:35.00]我一定卷起袖子帮助他 [02:40.34]因为我们是一家人 [02:44.14]相亲相爱的一家人 [02:48.01]有缘才能相聚 [02:49.72]有心才会珍惜 [02:51.55]何必让满天乌云遮住眼睛 [02:55.46]因为我们是一家人 [02:59.14]相亲相爱的一家人 [03:02.84]有福就该同享 [03:04.53]有难必然同当 [03:06.38]用相知相守换地久天长 [03:10.01] [03:11.40]处处为你用心 [03:14.11]一直最有默契 [03:18.26]请你相信这份感情值得感激 [03:28.99]因为我们是一家人 [03:32.54]相亲相爱的一家人 [03:36.09]有缘才能相聚 [03:37.76]有心才会珍惜 [03:39.52]何必让满天乌云遮住眼睛 [03:43.34]因为我们是一家人 [03:47.10]相亲相爱的一家人 [03:50.55]有福就该同享 [03:52.60]有难必然同当 [03:54.23]用相知相守换地久天长 [04:02.43]';
        }else if (s == "1"){
            lrc = '[ti:认真的雪] [ar:薛之谦] [al:认真的雪] [00:00.95]认真的雪 [00:01.20]演唱：薛之谦 [00:01.48] [00:02.24]雪下地那么深 下得那么认真 [00:07.49]倒映出我躺在雪中的伤痕 [00:11.44] [00:24.95]夜深人静 那是爱情 [00:34.24]偷偷地控制着我的心 [00:37.22]提醒我 爱你要随时待命 [00:41.21] [00:43.42]音乐安静 还是爱情啊 [00:52.36]一步一步吞噬着我的心 [00:55.70]爱上你 我失去了我自己 [01:00.12] [01:01.37]爱得那么认真 爱得那么认真 [01:06.80]可还是听见了你说不可能 [01:10.81]已经十几年没下雪的上海 [01:14.21]突然飘雪 [01:16.01]就在你说了分手的瞬间 [01:19.71]雪下得那么深 下得那么认真 [01:25.08]倒映出我躺在雪中的伤痕 [01:29.66]我并不在乎自己 [01:31.58]究竟多伤痕累累 [01:34.27]可我在乎今后你有谁陪 [01:39.04] [02:05.69]音乐安静 还是爱情啊 [02:14.57]一步一步吞噬着我的心 [02:17.86]爱上你 我失去了我自己 [02:22.53] [02:23.64]爱得那么认真 爱得那么认真 [02:29.06]可还是听见了你说不可能 [02:33.08]已经十几年没下雪的上海 [02:36.49]突然飘雪 [02:38.26]就在你说了分手的瞬间 [02:41.97]雪下得那么深 下得那么认真 [02:47.36]倒映出我躺在雪中的伤痕 [02:51.94]我并不在乎自己 [02:53.81]究竟多伤痕累累 [02:56.59]可我在乎今后你有谁陪 [03:01.64] [03:02.69]爱得那么深 爱得那么认真 [03:07.98]可还是听见了你说不可能 [03:11.93]已经十几年没下雪的上海 [03:15.30]突然飘雪 [03:17.13]就在你说了分手的瞬间 [03:20.68]雪下得那么深 下得那么认真 [03:26.20]倒映出我躺在雪中的伤痕 [03:30.79]我并不在乎自己 [03:32.69]究竟多伤痕累累 [03:35.41]可我在乎今后你有谁陪 [03:40.28] [03:41.74]爱得那么深 比谁都认真 [03:46.68]可最后还是只剩我一个人 [03:51.31]漫天风雪请别再把我的眼泪擦去 [03:56.05]毕竟那是我最爱的女人 [04:01.33]毕竟我曾是她深爱的人 [04:11.46]';
        }else{
            lrc='[00:03.52]纯音乐暂无歌词' ;
        };
        return lrc;
    };

    // 联动音乐播放歌词
    audioDom.addEventListener("timeupdate",function(){
        // 获取当前播放时间
        var timer = this.currentTime;
        // 解析音乐对应的时间
        var s = parseInt(timer);
        // 对应的时间选中歌词添加颜色
        $(".l_"+s).addClass("sel").siblings().removeClass("sel");
        // 联动滚动条自动滚动
        $(".l_con").scrollTop(($(".sel").index()-3)*30);
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
            };
            if(n > maxLeft){
                n = maxLeft;
            };

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
        };
    });


    // 定义格式化日期的函数
    function formartTime(time){
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);
        return (m < 10 ? "0" + m:m) + " : " + (s < 10 ? "0" + s : s);
    };

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
        // 加载歌词
        loadLrc(playIndex);
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
        };
    });
});