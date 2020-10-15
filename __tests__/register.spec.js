import {mount} from '@vue/test-utils'
import Register from '@/components/register/Register'
//import ElementUI from 'element-ui'
// import Vue from 'vue'
// Vue.use(ElementUI)

describe('Register',()=>{
    const wrapper = mount(Register)
    //const submitButton = wrapper.find('.el-button')

    wrapper.setData({ruleForm:{name:'yxb',pass:'123456',checkPass:'123456',email:'abc@mails.com',sex:'male'}})
    it('name',async()=>{
        expect(wrapper.vm.ruleForm.name).toBe('yxb')
    })
    it('pass',async()=>{        
        expect(wrapper.vm.ruleForm.pass).toBe('123456')
    })
    it('checkPass',async()=>{
        expect(wrapper.vm.ruleForm.checkPass).toBe('123456')
    })
    it('email',async()=>{
        expect(wrapper.vm.ruleForm.email).toBe('abc@mails.com')
    })
    it('sex',async()=>{
        expect(wrapper.vm.ruleForm.sex).toBe('male')
    })
    
})