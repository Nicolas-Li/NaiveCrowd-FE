import {mount,config,createLocalVue} from '@vue/test-utils'
import Task from '@/components/task/demander/Task'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false


describe('Task',()=>{
    const wrapper = mount(Task,{localVue})
    const button=wrapper.find('.el-button')

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
    const wrapper1 = mount(Task, {localVue,
        propsData: {
            task:{
                status: 1
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper1.findAll('.el-button').at(0).trigger('click')
    })
    it('can finish',async ()=> {
        await wrapper.setProps(
            {
                task:{
                    id: "3a4d567",
                    title: "标题",
                    intro: "介绍",
                    status: 3,
                    time: new Date().getTime()
                }
            }
        )
        await wrapper.findAll('.el-button').at(0).trigger('click')
        Vue.nextTick(() => {
            expect (wrapper.vm.task.status).toBe(3)
            done()
        })
    })

    const wrapper2 = mount(Task, {localVue,
        propsData: {
            task:{
                status: 2
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper2.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper3 = mount(Task, {localVue,
        propsData: {
            task:{
                status: 3
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper3.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper4 = mount(Task, {localVue,
        propsData: {
            task:{
                status: 4
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper4.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper5 = mount(Task, {localVue,
        propsData: {
            task:{
                status: 5
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper5.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper6 = mount(Task, {localVue,
        propsData: {
            task:{
                status: 6
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper6.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper7 = mount(Task, {localVue,
        propsData: {
            task:{
                status: 7
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper7.findAll('.el-button').at(0).trigger('click')
    })
})