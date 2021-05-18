$(function() {
        var layer = layui.layer;
        getUserInfo();

        // 退出事件
        $('#logout').on('click', function() {
            layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function(index) {
                localStorage.removeItem('token');
                location.href = '/login.html'
                layer.close(index)
            })
        })
    })
    // 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        }
    })
}

// 渲染用户头像
function renderAvatar(data) {
    var name = data.nickname || data.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (data.user_pic != null) {
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var txt = name[0].toUpperCase();
        $('.text-avatar').html(txt).show();
    }
}