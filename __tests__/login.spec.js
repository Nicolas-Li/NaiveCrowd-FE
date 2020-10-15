import {mount} from '@vue/test-utils'
import Login from '@/components/log/login/Login'
import ElementUI from 'element-ui'
import Vue from 'vue'
Vue.use(ElementUI)

describe('Login',()=>{
    const wrapper = mount(Login)
    const submitButton=wrapper.find('.el-button')

    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-button').length).toBe(2)
       
    })

    wrapper.setData({ruleForm:{name:'yxb',pass:'123456'}})

    it('name',async()=>{
        await submitButton.trigger('click')
        expect(wrapper.vm.ruleForm.name).toBe('yxb')
    })

    it('pass',async()=>{
        await submitButton.trigger('click')
        expect(wrapper.vm.ruleForm.pass).toBe('123456')
    })
    
})