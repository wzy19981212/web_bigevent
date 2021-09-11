$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须再1-6个字符之间'
            }
        }
    })
    initUserInfo()
    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                /* console.log(res); */
                //调用form.val()快速赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    //重置表单的数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()

    })
    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            //快速拿到表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新信息成功')
                //调用父页面的方法 重新渲染用户的头像和信息
                window.parent.getUserinfo()
            }
        })
    })
})