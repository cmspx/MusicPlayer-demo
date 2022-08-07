// 1. 歌曲搜索
    /*
        1. 按下回车 v-for .enter
        2. 查询数据 axios 接口 v-model
        3. 渲染数据 v-for 数组 that

        接口
        请求地址：https://autumnfish.cn/search
        请求方法：get
        请求参数：keywords（查询的关键字）
        响应内容：歌曲搜索结果
    */

// 2. 歌曲播放
    /*
        1. 点击播放（v-on）
        2. 歌曲地址获取（接口 歌曲id）
        3. 歌曲地址设置（v-bind设置元素属性）

        接口
        请求地址：https://autumnfish.cn/song/url
        请求方法：get
        请求参数：id（歌曲id）
        响应内容：歌曲的url地址
    */

// 3. 歌曲封面
    /*
        1. 点击播放（上一步已完成，增加逻辑即可）
        2. 歌曲封面获取（接口 歌曲id传递给服务器）
        3. 歌曲封面设置（v-bind获取到封面后设置给src属性）
        
        接口
        请求地址：https://autumnfish.cn/song/detail
        请求方法：get
        请求参数：ids（歌曲id）
        响应内容：歌曲详情，包含封面信息
    */

// 4. 歌曲评论
    /*
        1. 点击播放（上一步已完成，增加逻辑即可）
        2. 歌曲评论获取（接口 歌曲id传递给服务器）
        3. 歌曲评论渲染（v-for在页面上渲染列表结构）
        
        接口
        请求地址：https://autumnfish.cn/comment/hot?type=0
        请求方法：get
        请求参数：id（歌曲id，type固定为0）
        响应内容：歌曲的热门评论
    */

// 5. 播放动画
    /*
        1. 监听音乐播放（v-on切换类名）
        2. 监听音乐暂停（v-on切换类名）
        3. 操作类名（v-bind结合对象，修改有或无两种状态）
    */

var app = new Vue ({
    el:"#player",
    data: {
        // 查询的信息为query
        query:"",
        // 数据查询完毕以列表方式渲染在页面上
        musicList:[],
        // 保存歌曲地址
        musicUrl:"",
        // 保存歌曲封面
        musicCover:"",
        // 保存歌曲评论
        hotComments:[],
        // 动画播放状态
        isPlaying:false
    },
    methods:{
        // 1. 歌曲搜索
        searchMusic:function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
            .then(function(response){
                // 找到songs
                // console.log(response);
                that.musicList = response.data.result.songs;
                // console.log(response.data.result.songs);
            },function(err){})
        },
        // 2. 播放音乐
        playMusic:function(musicId) {
            var that = this;
            // console.log(musicId);
            // 调用接口
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
            .then(function(response){
                // 找到url
                // console.log(response);
                // console.log(response.data.data[0].url);
                that.musicUrl = response.data.data[0].url;
            },function(err){})

            // 3. 歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
            .then(function(response){
                // 找到picUrl
                // console.log(response);
                // console.log(response.data.songs[0].al.picUrl);
                that.musicCover = response.data.songs[0].al.picUrl;
            },function(err){}),

            // 4. 歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
            .then(function(response){
                // 找到hotComments
                // console.log(response);
                // console.log(response.data.hotComments);
                that.hotComments = response.data.hotComments;
            },function(err){})
        },
        play:function() {
            // console.log("play");
            this.isPlaying = true;
        },
        pause:function() {
            // console.log("pause");
            this.isPlaying = false;
        }
     }
})

