<template>
    <div>
        <div class="headerTop">
            <div class="headerTop_title">容器管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">冰箱管理</div>
        </div>
        <!-- 头部搜索条件 -->
        <div class="btnContent">
            <div class="btnContentTop">
                <div class="btnContentLeft">
                    <span>90%及以上</span>
                    <span>60%及以上</span>
                    <span>40%及以上</span>
                    <span>20%及以上</span>
                    <span>10%及以上</span>
                </div>
                <div class="btnContentRight">
                    <div class="content_btn">
                        <img src="../../assets/img/loading.png" alt />
                        <p>重置</p>
                    </div>
                    <div class="content_btn success">
                        <img src="../../assets/img/add1.png" alt />
                        <p>新增冰箱</p>
                    </div>
                    <div class="content_btn error">
                        <img src="../../assets/img/delete1.png" alt />
                        <p>删除</p>
                    </div>
                    <div class="content_btn">
                        <img src="../../assets/img/edit.png" alt />
                        <p>修改</p>
                    </div>
                </div>
            </div>
            <div class="btnContentBottom">
                <div class="btnSelect">
                    <span>选择房间:</span>
                    <el-select v-model="value" placeholder="请选择"></el-select>
                </div>
                <div class="searchForm">
                    <el-input
                        class="searchFormInput"
                        placeholder="输入搜索条件"
                        v-model="keyword"
                        clearable
                    ></el-input>
                    <div class="searchFormBtn">搜索</div>
                </div>
            </div>
        </div>

        <!-- 主体内容 -->
        <div class="container1">
            <div class="item">
                <div class="item1 kk">
                    <div class="itemTop">
                        <img src="../../assets/img/icebox.png" alt />
                    </div>
                    <div class="itemBot">
                        <p>BX-001</p>
                    </div>
                </div>
                <div class="item2 kk">
                    <div class="itemTop2">
                        <div class="start">
                            <img src="../../assets/img/tag.png" class="img1" alt />
                            <div class="txt">
                                冰箱编号：
                                <p>ybr123</p>
                            </div>
                        </div>
                        <div class="txt">
                            冰箱编号：
                            <p>ybr123</p>
                        </div>
                        <div class="txt">
                            冰箱编号：
                            <p>ybr123</p>
                        </div>
                        <div class="start">
                            <img src="../../assets/img/use.png" class="img1" alt />
                            <div class="txt">认为帅</div>
                        </div>
                        <div class="dic">
                            <div class="title">-30℃</div>
                            <div class="txt1">海尔</div>
                        </div>
                    </div>
                    <div class="itemBot2">
                        <div class="title2">冰箱可放入材料：</div>
                        <div class="txt2">冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料冰箱可放入材料</div>
                    </div>
                    <div class="more">查看详情</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keyword: '',
            value: ''
        };
    },
    methods: {
        search() {}
    }
};
</script>
<style lang="less" scoped>
.btnSelect {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    span {
        width: 100px;
    }
}
.container1 {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 30px;
    .item {
        width: 292px;
        height: 292px;
        position: relative;
        overflow: hidden;
        transform-style: preserve-3d;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 20px 0px rgba(217, 221, 226, 0.5);
        border-radius: 4px;
        margin: 0 30px 26px 0;
        .item:nth-child(5n) {
            margin-right: 0;
        }
        .item1,
        .item2 {
            width: 292px;
            height: 292px;
            display: flex;
            flex-direction: column;
            position: absolute;
        background: rgba(255, 255, 255, 1);
            top: 0;
            left: 0;
            transform-style: preserve-3d;
            transition: all .5s ease-in;
            .itemTop {
                width: 100%;
                height: 242px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 142px;
                    height: 161px;
                }
            }
            .itemBot {
                width: 100%;
                height: 49px;
                box-sizing: border-box;
                border-top: 1px solid #dddddd;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: rgba(96, 99, 108, 1);
                line-height: 18px;
                p {
                    position: relative;
                }
                p::after {
                    content: '';
                    position: absolute;
                    width: 9px;
                    height: 9px;
                    left: -15px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(250, 72, 58, 1);
                    border-radius: 100%;
                }
            }
        }
        .item2 {
            opacity: 0;
            transform: rotateY(180deg);
            .itemTop2 {
                position: relative;
                box-sizing: border-box;
                padding: 20px 15px 0;
                .start {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .img1 {
                        width: 15px;
                        height: 15px;
                        margin-top: 6px;
                        margin-right: 4px;
                    }
                    .txt {
                        padding-left: 0;
                    }
                }
                .txt {
                    font-size: 14px;
                    color: rgba(89, 91, 105, 1);
                    line-height: 19px;
                    margin-top: 6px;
                    padding-left: 19px;
                    display: flex;
                    flex-direction: row;
                    p {
                        width: 100px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 14px;
                        color: rgba(16, 25, 45, 1);
                        line-height: 19px;
                    }
                }
                .dic {
                    position: absolute;
                    right: 23px;
                    top: 13px;
                    display: flex;
                    flex-direction: column;
                    .title {
                        font-size: 30px;
                        font-weight: bold;
                        color: rgba(250, 72, 58, 1);
                        line-height: 40px;
                    }
                    .txt1 {
                        font-size: 14px;
                        color: rgba(16, 25, 45, 1);
                        line-height: 19px;
                        text-align: right;
                    }
                    .txt1::after {
                        content: '';
                        width: 9px;
                        height: 9px;
                        background: rgba(250, 72, 58, 1);
                        border-radius: 100%;
                        position: absolute;
                        bottom: -15px;
                        right: 0;
                    }
                }
            }
            .itemBot2 {
                border-top: 1px solid #dddddd;
                margin-top: 10px;
                padding-top: 10px;
                max-height: 153px;
                box-sizing: border-box;
                padding: 10px 34px 0 39px;
                .title2 {
                    font-size: 14px;
                    color: rgba(89, 91, 105, 1);
                    line-height: 19px;
                }
                .txt2 {
                    font-size: 14px;
                    color: rgba(194, 196, 201, 1);
                    line-height: 19px;
                    padding-top: 6px;
                }
            }

            .more {
                width: 100%;
                height: 50px;
                background: rgba(250, 72, 58, 1);
                border-radius: 0px 0px 4px 4px;
                font-size: 14px;
                color: rgba(255, 255, 255, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                bottom: 0;
                left: 0;
                cursor: pointer;
            }
        }
    }
    .item:hover .item1 {
        transform: rotateY(180deg);
        opacity: 0;
    }
    .item:hover .item2 {
        transform: rotateY(0);
        opacity: 1;
    }
}
</style>