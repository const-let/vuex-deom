
<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value='inputValue' @change="hand"/>
    <a-button type="primary" @click="addEvent">添加事项</a-button>

    <a-list bordered :dataSource="infolist" class="dt_list" >
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbStatusChanged(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemId(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey==='all'?'primary':'default'"  @click="undone('all')">全部</a-button>
          <a-button @click="undone('und')" :type="viewKey==='und'?'primary':'default'">未完成</a-button>
          <a-button :type="viewKey==='done'?'primary':'default'"  @click="undone('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clem">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import  {mapState} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  // 生命周期
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue','viewKey']),
  ...mapGetters(['unDoneLength', 'infolist'])
  },
  methods: {
    // 监听文本框内容变化
    hand(e){
        //  console.log(e.target.value);
          this.$store.commit('setInputValue',e.target.value)
    },
    // 向列表中新增 item项
    addEvent(){
     if (this.inputValue.trim().length<=0) {
     return this.$message.warning('文本框不能为空')
      }else{
        this.$store.commit('addItem')
      }
    },
   removeItemId(id){
//console.log(id);
  this.$store.commit('removeItem',id)
    },
    // 监听复选框变化的事件
   cbStatusChanged(e,id){
        // console.log(e.target.checked);
      const param={
        id:id,
        status:e.target.checked
      }
      this.$store.commit('changeStatus',param)
  },
  // 清除已完成的任务
  clem(){
this.$store.commit('cleanDone')
  },
  undone(key){
    this.$store.commit('changeViewKey',key)
  }
  },
  
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
