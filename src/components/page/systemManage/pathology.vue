<template>
    <div>
        <!-- 卡片视图 -->
        <div class="headerTop">
            <div class="headerTop_title">系统管理</div>
            <i class="el-icon-d-arrow-right"></i>
            <div class="headerTop_text">数据字典</div>
        </div>
        <el-card>
            <el-table :data="tables" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div v-for="(item,index) in columns" :key="index" class="tab2">
                            <div v-if="props.row.name === item.tablename">
                                <div class="item1">
                                    <div class="label">{{item.colname}}</div>
                                    <template>
                                        <div class="tagList">
                                            <span
                                                class="tag"
                                                v-for="(item1,index1) in item.patient_config_check"
                                                :key="index1"
                                            >
                                                {{item1.value}}
                                                <i
                                                    class="el-tag__close el-icon-close"
                                                    @click="handleDelete(item1.id,item.patient_config_check)"
                                                ></i>
                                            </span>
                                            <span
                                                class="tag tag1"
                                                v-if="showId !== item.id"
                                                @click="showInput(item.id)"
                                            >+new</span>
                                            <el-input
                                                v-if="showId==item.id"
                                                class="input1"
                                                v-model="item.value"
                                                clearable
                                                @keydown.native.enter="save(item)"
                                            ></el-input>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="编号病理" prop="name" width="300"></el-table-column>
                <el-table-column label="病理名称" prop="description"></el-table-column>
                <!-- <el-table-column label="描述" prop="desc"></el-table-column> -->
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            keyword: '', //关键字

            tableData: [
                {
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                },
                {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                },
                {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                },
                {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }
            ],
            showId: null, //显示对应的input
            tables: [], //病理父
            columns: [] //病理子
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 添加
        add() {},
        // 获取数据
        getData(pageIndex) {
            this.$http.post('/api/patient/getpatientconfiglist', {}).then((res) => {
                if (res.data.success) {
                    console.log(res.data.result);
                    this.tables = res.data.result.tables;
                    this.columns = res.data.result.columns;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 显示对应的input
        showInput(Id) {
            this.showId = Id;
        },
        // 保存
        save(item) {
            this.showId = null; //隐藏输入框
            let tempArr = this.columns;
            tempArr.forEach((item1) => {
                if (item1.id == item.id) {
                    item1.patient_config_check.push({
                        col: item1.col,
                        isdelete: false,
                        sort: item1.patient_config_check.length,
                        tablename: item1.tablename,
                        value: item1.value
                    });
                    this.$http
                        .post('/api/patient/savepatientconfigcheck', {
                            col: item.col,
                            value: item.value,
                            sort: item.patient_config_check.length,
                            tablename: item.tablename
                        })
                        .then((res) => {
                            if (res.data.success) {
                                this.$message.success(res.data.message);
                            } else {
                                this.$message.error(res.data.message);
                            }
                        });
                }
                item1.value = '';
            });
            this.columns = tempArr;
            console.log(item);
        },
        // 删除标签
        handleDelete(Id, tempArr) {
            tempArr.forEach((item, index) => {
                if (item.id == Id) {
                    tempArr.splice(index, 1);
                    this.$http.post('/api/patient/deletepatientconfigcheck', { id: Id }).then((res) => {
                        if (res.data.success) {
                            this.$message.success(res.data.message);
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                }
            });
        }
    }
};
</script>
<style lang="less" scope>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 60%;
}
.demo-table-expand {
    display: flex;
    flex-direction: column;
}
.tab2 {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
}
.item1 {
    width: 100%;
    height: 40px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}
.label {
    display: flex;
    justify-content: center;
    width: 300px;
}
.tagList {
    width: 82%;
    height: 40px;
    display: flex;
    justify-content: center;
    flex-direction: row;
}
.tag {
    display: flex;
    background-color: #ecf5ff;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    margin-right: 10px;
    position: relative;
}
.tag1 {
    background: #fff;
    cursor: pointer;
}
.input1 {
    width: 100px;
}
</style>