import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[],
    inputValue:'',
    nextId:5,
    viewKey:'all'
  },
  getters:{
    //统计未完成的个数
    unDoneLength(state){
      // 过滤未完成的长度
     return  state.list.filter(x=>x.done===false).length
    },
    infolist(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'und') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
},
  mutations: {
    initList(state,list){
      state.list=list
    },
    // 为state中的inputValue赋值
    setInputValue(state,val){
      state.inputValue=val
    },
    // 添加列表项
    addItem(state){
  const obj={
  id:state.nextId,
  info:state.inputValue.trim(),
  done:false
  }
  state.list.push(obj)
  state.nextId++
  state.inputValue=''
    },
    removeItem(state,id){
     // 根据id查找对应的索引
   const i=  state.list.findIndex(x=>x.id===id)
    // 根据索引删除对应的元素
     if (i !==-1) {
  state.list.splice(i,1)
      }
    },
    // 修改列表的选中状态
    changeStatus(state,param){
     const i= state.list.findIndex(x=>x.id===param.id);
     if (i !== -1) {
       state.list[i].done=param.status
     }
    },
    cleanDone(state){
      // 过滤未完成的
 state.list= state.list.filter(x=>x.done===false)
    }, 
   changeViewKey(state,key){
    state.viewKey=key;
   }
  },
  actions: {
    getList(context){
  axios.get('/list.json').then(({data})=>{
  console.log(data);
  context.commit('initList',data)
})
    }
  },
  modules: {
  }
})
