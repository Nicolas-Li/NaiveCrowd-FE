import {mount,config,createLocalVue} from '@vue/test-utils'
import Configuration from '@/components/task/demander/Configuration'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false


describe('Configuration',()=>{
    const wrapper = mount(Configuration,{localVue})
    const button=wrapper.find('.el-button')

    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-input').length).toBe(7)
    })

    //wrapper.setData({loading:true,money:100})

    it('money',async()=>{
        //await button.trigger('click')
        expect(wrapper.vm.task.title).toBe("任务标题")
    })

    
})