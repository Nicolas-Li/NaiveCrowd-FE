import {mount,config,createLocalVue} from '@vue/test-utils'
import Register from '@/components/log/register/Register'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false

describe('Register',()=>{
    const wrapper = mount(Register,{localVue})
    const submitButton = wrapper.find('.el-button')
    const resetButton = wrapper.findAll('.el-button').at(1)
    wrapper.setData({
        ruleForm:{
            name:'',
            pass:'',
            checkPass:'',
            email:'',
            sex:''
        }
    })
    // wrapper.vm.submitForm("x")
    // wrapper.vm.resetForm("x")
    wrapper.setData({
        ruleForm:{
            name:'yxb',
            pass:'123456',
            checkPass:'123456',
            email:'abc@mails.com',
            sex:'male'
        }
    })
    it('name',async()=>{
        await submitButton.trigger('click')
        await resetButton.trigger('click')
        expect(wrapper.vm.ruleForm.name).toBe('')
    })
    it('pass',async()=>{    
        await submitButton.trigger('click')  
        await resetButton.trigger('click')  
        expect(wrapper.vm.ruleForm.pass).toBe('')
    })
    it('checkPass',async()=>{
        await submitButton.trigger('click')
        await resetButton.trigger('click')
        expect(wrapper.vm.ruleForm.checkPass).toBe('')
    })
    it('email',async()=>{
        await submitButton.trigger('click')
        await resetButton.trigger('click')
        expect(wrapper.vm.ruleForm.email).toBe('')
    })
    it('sex',async()=>{
        await submitButton.trigger('click')
        await resetButton.trigger('click')
        expect(wrapper.vm.ruleForm.sex).toBe('')
    })
    
})