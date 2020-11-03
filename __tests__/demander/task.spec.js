import {mount,config,createLocalVue} from '@vue/test-utils'
import Task from '@/components/task/demander/Task'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false


describe('Task',()=>{
    var wrapper = mount(Task,{localVue})
    var button=wrapper.find('.el-button')

    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-button').length).toBe(1)
    })
    it('can show button-content rightly', ()=> {
        expect(button.text()).toBe('配置任务')
    })
    it('can change button-content rightly',async ()=> {
        await wrapper.findAll('.el-button').at(0).trigger('click')
        expect(button.text()).toBe('进入配置')
    })
    wrapper.destroy()
    wrapper = mount(Task,{
        task:{
            id: "3a4d567",
            title: "标题",
            intro: "介绍",
            status: 2,
            time: new Date().getTime()
        }
    })
    it('can show percentage rightly', async () =>{
        wrapper.findAll('.el-button').at(0).trigger('click')
        expect (wrapper.vm.task.status).toBe(2)
        expect (wrapper.findAll('.el-progress').length).toBe(1)
        expect (wrapper.vm.loading).toBe(true);
    })
    wrapper.destroy()
    wrapper = mount(Task,{
        task:{
            id: "3a4d567",
            title: "标题",
            intro: "介绍",
            status: 1,
            time: new Date().getTime()
        }
    })
    it('can check demander money rightly',async ()=> {
        await wrapper.findAll('.el-button').at(0).trigger('click')
    })
    wrapper.destroy()
    wrapper = mount(Task,{
        task:{
            id: "3a4d567",
            title: "标题",
            intro: "介绍",
            status: 7,
            time: new Date().getTime()
        }
    })
    it('can break',async ()=> {
        await wrapper.find('.el-button').trigger('click')
        expect (wrapper.vm.task.status).toBe(7)
    })
    wrapper = mount(Task,{
        task:{
            id: "3a4d567",
            title: "标题",
            intro: "介绍",
            status: 3,
            time: new Date().getTime()
        }
    })
    it('can finish',async ()=> {
        wrapper.find('.el-button').trigger('click')
        expect (wrapper.vm.task.status).toBe(3)
    })

    //wrapper.setData({loading:true,money:100})

    // it('money',async()=>{
    //     await button.trigger('click')
    //     expect(wrapper.vm.money).toBe(100)
    // })

    
})