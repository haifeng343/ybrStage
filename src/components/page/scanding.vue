<template>
    <div></div>
</template>
<script>
export default {
    data() {
        return {
            code: '', //钉钉登录的code
            openid: '', //如果有就是改绑 如果没有就是绑定
            type: '' //从header传过来的值
        };
    },
    mounted() {
        this.openid = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).openid : '';
        this.type = this.$route.query.type;
        if (this.$route.query.code && this.$route.query.state == 'login') {
            this.$http
                .post('/api/dingtalk/scanlogin', {
                    tmp_auth_code: this.$route.query.code
                })
                .then((res) => {
                    if (res.data.success) {
                        this.$message.success(res.data.message);
                        this.$store.state.userInfo = res.data.result;
                        localStorage.setItem('userInfo', JSON.stringify(res.data.result));
                        localStorage.setItem('ms_username', res.data.result.username);
                        localStorage.setItem('token', res.data.result.token);
                        localStorage.setItem('menu', JSON.stringify(res.data.result.authmenu));
                        this.$router.push('/');
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
        if (!this.openid && this.$route.query.state == 'bind') {
            //绑定
            this.$http
                .post('/api/dingtalk/bindaccountbyuser', {
                    tmp_auth_code: this.$route.query.code,
                    userid: JSON.parse(localStorage.getItem('userInfo')).userid
                })
                .then((res) => {
                    if (res.data.success) {
                        this.$message.success(res.data.message);
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
        if (this.openid &&  this.$route.query.state == 'bind') {
            //改绑
            this.$http.post('/api/dingtalk/unbindaccount', {}).then((res) => {
                if (res.data.success) {
                    this.$http
                        .post('/api/dingtalk/bindaccountbyuser', {
                            tmp_auth_code: this.$route.query.code,
                            userid: JSON.parse(localStorage.getItem('userInfo')).userid
                        })
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.success) {
                                this.$message.success(res.data.message);
                            } else {
                                this.$message.error(res.data.message);
                            }
                        });
                } else {
                    this.$message.error(res.data.message);
                }
            });
        }

        console.log(this.$route.query);
    }
};
</script>