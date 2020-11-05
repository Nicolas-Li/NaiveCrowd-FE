import {mount,config,createLocalVue} from '@vue/test-utils'
import Detail from '@/components/person/Detail'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false


describe('Detail',()=>{
    const wrapper = mount(Detail,{localVue})
    const button=wrapper.find('.el-button')
    const image=wrapper.find('.el-image')

    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-button').length).toBe(4)
        expect(wrapper.findAll('.el-row').length).toBe(10)
    })

    wrapper.setData({
        name: "unknown",
        email: "unknown",
        sex: "unknown",
        credit: 100,
        money: 0,
        dialogVisible: false,
        password: null
    })

    it('money',async()=>{
        //await button.trigger('click')
        expect(wrapper.vm.money).toBe(0)
    })

    
})