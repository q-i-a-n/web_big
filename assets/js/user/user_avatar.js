$(function() {
    var layer = layui.layer;
    var $image = $('#image');
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    };
    $image.cropper(options);

    $('#btnChooseImg').on('click', function() {
        $('#file').click();
    })
    $('#file').on('change', function(e) {
        console.log(11);
        var fileList = e.target.files;
        console.log(fileList);
        if (fileList.length === 0) {
            return layer.msg('请选择照片！')
        }
        var file = fileList[0];
        var imgURL = URL.createObjectURL(file);
        $('#image').cropper('destroy').attr('src', imgURL).cropper(options)
    })

    $('#btnUploadImg').on('click', function() {
        var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png');
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo();
            }
        })
    })

})