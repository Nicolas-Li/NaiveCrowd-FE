import {mount,config,createLocalVue} from '@vue/test-utils'
import Login from '@/components/log/login/Login'
import ElementUI from 'element-ui'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false


describe('Login',()=>{
    const wrapper = mount(Login,{localVue})
    const submitButton=wrapper.find('.el-button')

    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-button').length).toBe(2)
       
    })

    wrapper.setData({ruleForm:{name:'yxb',pass:'123456'}})

    it('name',async()=>{
        await submitButton.trigger('click')
        expect(wrapper.vm.ruleForm.name).toBe('')
    })

    it('pass',async()=>{
        await submitButton.trigger('click')
        expect(wrapper.vm.ruleForm.pass).toBe('')
    })
    wrapper.setData({ruleForm:{name:'',pass:''}})

    it('name',async()=>{
        await submitButton.trigger('click')
        expect(wrapper.vm.ruleForm.name).toBe('')
    })

    it('pass',async()=>{
        await submitButton.trigger('click')
        expect(wrapper.vm.ruleForm.pass).toBe('')
    })
})