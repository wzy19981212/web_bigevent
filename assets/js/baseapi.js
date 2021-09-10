/* //注意 每次调用get post ajax的时候
//会优先调用ajaxPrefilter这个函数
//在这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {

    //再发起真正ajax请求之前 同意拼接请求的跟陆劲
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
}) */