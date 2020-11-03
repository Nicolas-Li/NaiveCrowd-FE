import {mount,config,createLocalVue} from '@vue/test-utils'
import Person from '@/components/person/Person'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false


describe('person',()=>{
    const wrapper = mount(Person,{localVue})
    const button=wrapper.find('.el-button')

    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-menu-item').length).toBe(6)
    })

    //wrapper.setData({loading:true,money:100})

    // it('money',async()=>{
    //     await button.trigger('click')
    //     expect(wrapper.vm.money).toBe(100)
    // })

    
})