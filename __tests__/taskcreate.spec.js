import {mount,config,createLocalVue} from '@vue/test-utils'
import TaskCreate from '@/components/task/demander/TaskCreate'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false

describe('TaskCreate', ()=>{
    const wrapper = mount(TaskCreate, {localVue})
    const buttons = wrapper.findAll('.el-button')
    it('have right buttons',async ()=>{
        expect (wrapper.findAll('.el-button').length).toBe(3)
        await buttons.at(0).trigger('click')
        await buttons.at(1).trigger('click')
        await buttons.at(2).trigger('click')
        expect(buttons.at(1).text()).toBe("立即创建")
    }) 
    const wrapper1 = mount(TaskCreate, {localVue,data()
         {
            return {
                isSubmitting: true
            }
        }
    })
    const buttons1 = wrapper1.findAll('.el-button')
    it('have right buttons',async ()=>{
        expect(wrapper1.vm.isSubmitting).toBe(true)
        expect(buttons1.at(1).text()).toBe("正在创建")
    }) 
})