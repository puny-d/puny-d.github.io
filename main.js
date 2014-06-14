    jQuery(document).ready( function($) {
        $('.error-message').hide();
        $('.get_password').click(function() {
            var wait = 60;
            function time() {
                    if (wait === 0) {
                        $(".get_password").removeAttr("disabled");            
                        $(".get_password").val("获取密码");
                        $(".get_password").css({
                            "background-color":"#35be9e",
                            "cursor":"pointer"
                        });
                        wait = 60;
                    } else {
                        $(".get_password").attr("disabled", true);
                        $(".get_password").val("重新发送("+wait+"秒)");
                        $(".get_password").css("background-color","#3c3c3c");
                        wait--;
                        setTimeout(function() {
                            time();
                        },1000);
                    }
                }
            //jquery验证手机号码
            function checkMobile (){ 
                if($(".mobilephone").val()==""){ 
                    alert("手机号码不能为空"); 
                    $(".mobilephone").focus(); 
                    return false; 
                }else if(!$(".mobilephone").val().match(/^1[3|4|5|8][0-9]\d{8}$/)){ 
                    alert("手机号码格式不正确！请重新输入！"); 
                    $(".mobilephone").focus(); 
                    return false; 
                }else{
                    time(); 
                }
            }
            checkMobile ();
        var password = Math.round(900000*Math.random()+100000);
            $.post("/api/send_message_by_phone",{
                    phone:$('.mobilephone').val(),
                    ap_mac:$('.ap_mac').val(),
                    sta_mac:$('.sta_mac').val(),
                    password:password
                },function(data){
                result = jQuery.parseJSON(data);
                if (result.resultCode=='00000') {
                    //nothing
                } else {
                    alert('获取密码发生故障，请重试！')
                };
            });
        });
        
        $('.login').click(function() {
            $.post("/api/online",{
                    phone:$('.mobilephone').val(),
                    ap_mac:$('.ap_mac').val(),
                    sta_mac:$('.sta_mac').val(),
                    password:$('.password').val()
                },function(data){
                result = jQuery.parseJSON(data);
                if (result.code==1000) {
                    window.location.href='http://dev.zhimatech.com/portalpage/success';
                } else {
                    alert('登陆失败，请重试！')
                };
            });
        });
        var initial = parseInt(3600);
        function timer(initial) {
            setInterval(function() {
                var minute = 0,
                    second = 0;
                if(initial > 0) {
                    minute = Math.floor(initial/60);
                    second = Math.floor(initial) - (minute*60);
                }
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                $('.count').html(minute + "分" + ": "+ second + "秒");
                initial--;
            }, 1000);
        }
        timer(initial);
});
   