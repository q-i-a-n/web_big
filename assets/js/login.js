$(function() {
    $('#link_reg').on('click', function() {
        $('#login').hide();
        $('#reg').show();
    })

    $('#link_login').on('click', function() {
        $('#reg').hide();
        $('#login').show();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码为6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-form [name=password]').val();
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    // 注册用户请求
    $('#reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('.reg-form [name="username"]').val(),
            password: $('.reg-form [name="password"]').val()
        }
        console.log(data);
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！');
            $('#link_login').click();
        })

    });

    // 登录用户请求
    $('#login').on('submit', function(e) {
        console.log('denglu ');
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
        $('.login [name=username]').val('')
        $('.login [name=password]').val('')
    })

})