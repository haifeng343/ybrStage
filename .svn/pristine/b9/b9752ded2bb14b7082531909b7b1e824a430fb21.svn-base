<template>
    <div>
        <div id="ding-login" v-if="isShow == 'ding'"></div>
        <button @click="dingLogin">点击显示二维码</button>
    </div>
</template>
<script>
import qs from 'qs';
// 钉钉后台获取的appid和appSecret，appSecret没有用到扫码中
let appid = 'dingoavnbhbtdoebjs9u5j';
let appSecret = '55AxDMCBrfRcqWs2O0RnWmSaRc8aPIEhs0WqFYzhlZ2M3KfDsZp_h1Sk1UfwPrRZ';
// 重定向地址，因为vue用的hash，所以网址后面是 #/
let redirect = encodeURIComponent(`http://saas.mfetv.top/scanding`);
// let redirect = encodeURIComponent(`http://saas.mfetv.com/scanding`);
// 官网给的跳转连接格式
let http_url = encodeURIComponent(
    `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirect}`
);
export default {
    data() {
        return {
            isShow: '', // 控制扫码窗口显示
            code: qs.parse(window.location.hash.substring(3)).code // 获取的临时登陆码
        };
    },
    created() {
        // 如果临时登录吗存在，执行登录方法
        if (this.code) {
            /* 这里写登录方法 */
            return false;
        }
        // 获取到扫码结果，并且跳转获取临时登录码
        var handleMessage = function (event) {
            var origin = event.origin;
            if (origin == 'https://login.dingtalk.com') {
                //判断是否来自ddLogin扫码事件。
                // 拿到 loginTmpCode 后，跳转连接拿到临时登陆码，之后返回到跳转的地址，会携带临时登陆码
                var loginTmpCode = event.data;
                let url = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${http_url}&loginTmpCode=${loginTmpCode}`;
                // 这边直接打开拼接好的连接，去获取临时登录码，回来地址在下面
                location.href = url;
            }
        };
        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', handleMessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', handleMessage);
        }
    },
    methods: {
        // 切换钉钉登录
        dingLogin() {
            this.isShow = 'ding';
            // 这边需要用 $nextTick() 方法来等DOM渲染完成后，才能获取到盒子容器（$nextTick 方法见另一篇文章）
            this.$nextTick(() => {
                // 钉钉登录，参数文档中那些其他项就不展示了，按照文档自己配置就可以
                var obj = DDLogin({
                    id: 'ding-login',
                    goto: http_url,
                    style: 'border:none;background-color:#FFFFFF;'
                });
                // 重置扫码登录框的样式，让登录框居中
                let box = document.getElementById('ding-login');
                box.querySelector('iframe').style.position = 'absolute';
                box.querySelector('iframe').style.top = '0';
                box.querySelector('iframe').style.bottom = '0';
                box.querySelector('iframe').style.left = '0';
                box.querySelector('iframe').style.right = '0';
                box.querySelector('iframe').style.margin = 'auto';
            });
        }
    }
};
</script>