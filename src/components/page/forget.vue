<template>
    <div class="login-wrap">
        <img src="../../assets/img/logo.png" class="logo" alt />
        <div class="ms-login">
            <div class="ms-title">
                <p
                    :class="[item.active==true?'active':'']"
                    @click="setNav(item.id)"
                    v-for="item in nav"
                    :key="item.id"
                >{{item.name}}</p>
            </div>
            <img :src="img1" class="code" @click="setActive" alt />
                <el-form
                    :model="param"
                    :rules="rules"
                    ref="login"
                    label-width="0px"
                    class="ms-content"
                    v-if="showId == 2"
                >
                    <el-form-item prop="username">
                        <el-input v-model="param.username" class="input1" placeholder="username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            class="input1"
                            type="password"
                            placeholder="password"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                        ></el-input>
                    </el-form-item>
                    <div class="drag">
                        <div class="drag_bg"></div>
                        <div class="drag_text">{{confirmWords}}</div>
                        <div @mousedown="mousedownFn($event)" class="handler handler_bg">
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </div>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
                    <div class="noHas">
                        <p>返回登录</p>
                    </div>
                </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name:'forget',
    data: function () {
        return {
            showId: 2, //1扫码登录 2账户登录
            img1: this.showId == 1 ? require('../../assets/img/code.png') : require('../../assets/img/pc.png'), //扫码/账户登录
            nav: [
                //菜单栏
                {
                    id: 1,
                    name: '扫码登录',
                    active: false
                },
                {
                    id: 2,
                    name: '账户登录',
                    active: true
                }
            ],
            param: {
                username: 'admin',
                password: '000000'
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            beginClientX: 0,
            /*距离屏幕左端距离*/
            mouseMoveStata: false,
            /*触发拖动状态 判断*/
            maxwidth: 204,
            /*拖动最大宽度，依据滑块宽度算出来的*/
            confirmWords: '向右滑动验证',
            /*滑块文字*/
            confirmSuccess: false
            /*验证成功判断*/
        };
    },
    methods: {
        // 设置选中菜单
        setNav(Id) {
            this.showId = Id;
            let tempArr = this.nav;
            tempArr.forEach((item) => {
                if (item.id == this.showId) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
            if (this.showId == 1) {
                this.img1 = require('../../assets/img/code.png');
            } else {
                this.img1 = require('../../assets/img/pc.png');
            }
        },
        // 设置当前选中的扫码/账号登录
        setActive() {
            if (this.showId == 1) {
                this.showId = 2;
                this.img1 = require('../../assets/img/pc.png');
            } else {
                this.showId = 1;
                this.img1 = require('../../assets/img/code.png');
            }
            let tempArr = this.nav;
            tempArr.forEach((item) => {
                if (item.id == this.showId) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
        },
        submitForm() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    if (this.confirmSuccess == true) {
                        this.$http
                            .post('/api/xkspc/login', {
                                user: this.param.username,
                                pwd: this.param.password
                            })
                            .then((res) => {
                                if (res.data.success == true) {
                                    this.$message.success('登录成功');
                                    localStorage.setItem('ms_username', this.param.username);
                                    this.$router.push('/');
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请先进行登录验证',
                            type: 'warning'
                        });
                    }
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        mousedownFn: function (e) {
            this.mouseMoveStata = true;
            this.beginClientX = e.clientX;
        }, //按下滑块函数
        successFunction() {
            $('.handler').removeClass('handler_bg').addClass('handler_ok_bg');
            this.confirmWords = '验证通过';
            $('.drag').css({
                'background-color': '#fff ',
                color: '#333'
            });
            $('.handler').css({
                left: this.maxwidth
            });
            $('.drag_text').css({ color: '#fff' });
            $('.handler_ok_bg').css({ 'background-color': '#fff ', color: '#5d81f4 ' });
            $('.drag_bg').css({
                width: this.maxwidth
            });
            $('body').unbind('mousemove');
            $('body').unbind('mouseup');
            this.confirmSuccess = true;
        }
    },
    mounted() {
      console.log(22222222222)
        $('body').on('mousemove', (e) => {
            //拖动，这里需要用箭头函数，不然this的指向不会是vue对象
            if (this.mouseMoveStata) {
                var width = e.clientX - this.beginClientX;
                if (width > 0 && width <= this.maxwidth) {
                    $('.handler').css({
                        left: width
                    });
                    $('.drag_bg').css({
                        width: width
                    });
                } else if (width > this.maxwidth) {
                    this.successFunction();
                }
            }
        });
        $('body').on('mouseup', (e) => {
            //鼠标放开
            this.mouseMoveStata = false;
            var width = e.clientX - this.beginClientX;
            if (width < this.maxwidth) {
                $('.handler').css({
                    left: 0
                });
                $('.drag_bg').css({
                    width: 0
                });
            }
        });
    }
};
</script>

<style scoped>
.el-input--small {
    height: 40px !important;
}
div >>> .el-input > input {
    height: 40px;
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login_bg.png);
    background-size: 100%;
}
.logo {
    width: 200px;
    height: 75px;
    position: absolute;
    top: 46px;
    left: 83px;
}
.ms-title {
    width: 200px;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-size: 18px;
    color: #70737e;
}
.ms-title p {
    cursor: pointer;
    transition: all 0.3s;
}
.ms-title p.active {
    color: #353845;
    position: relative;
    font-weight: 600;
}
.ms-title p.active::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    width: 70px;
    height: 2px;
    background: rgba(53, 56, 69, 1);
    transform: translateX(-50%);
}
.ms-login {
    position: absolute;
    width: 310px;
    height: 330px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    top: 355px;
    right: 320px;
    overflow: hidden;
}
.code {
    width: 23px;
    height: 23px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    z-index: 999;
}
.ms-content {
    padding: 33px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 9px;
    background: #5d81f4 !important;
    color: #fff !important;
}
.saoCode {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.saoCode .img2 {
    width: 185px;
    height: 185px;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 10px;
}
.saoCode .tips {
    width: 169px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(112, 115, 126, 1);
}
.drag {
    border-radius: 6px;
    position: relative;
    background-color: #fff;
    width: 244px;
    color: #cdcdcd;
    border: 1px solid rgba(225, 229, 239, 1);
    height: 34px;
    margin-bottom: 20px;
    line-height: 34px;
    overflow: hidden;
    text-align: center;
}
.noHas {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #353845;
}
.handler {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 34px;
    cursor: move;
}

.handler_bg {
    /* background: #fff
        url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==')
        no-repeat center; */
    color: #fff;
    background: #5d81f4;
}

/* .handler_ok_bg {
    background: #fff
        url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==')
        no-repeat center;
} */

.drag_bg {
    /* border-radius: 30px; */
    background: #5d81f4;
    height: 34px;
    width: 0px;
}

.drag_text {
    position: absolute;
    top: 0px;
    width: 244px;
    font-size: 14px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
}
</style>