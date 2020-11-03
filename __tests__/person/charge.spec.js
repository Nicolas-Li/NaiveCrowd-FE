import {mount,config,createLocalVue} from '@vue/test-utils'
import Charge from '@/components/person/Charge'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false


describe('Charge',()=>{
    const wrapper = mount(Charge,{localVue})
    const button=wrapper.find('.el-button')

    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-button').length).toBe(1)
    })

    wrapper.setData({loading:true,money:100})

    it('money',async()=>{
        await button.trigger('click')
        expect(wrapper.vm.money).toBe(100)
    })

    
})