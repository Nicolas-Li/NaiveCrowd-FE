import {mount,config,createLocalVue} from '@vue/test-utils'
import Charge from '@/components/person/Charge'
import ElementUI from 'element-ui'
import axios from 'axios'
jest.mock('axios')
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
        button.trigger('click')
        await button.trigger('click')
        expect(wrapper.vm.money).toBe(0)
    })
    axios.post.mockResolvedValue({
        data:{
            type:"success",
            message:'123',
            taskMoney:10,
            demanderMoney:1,
            answersNum:1,
            totalNum:1,
        }
    })
    wrapper.vm.charge()

    wrapper.setData({loading:true,money:0})
    axios.post.mockResolvedValue({
        data:{
            type:"failed",
            message:'123',
            taskMoney:10,
            demanderMoney:1,
            answersNum:1,
            totalNum:1,
        }
    })
    wrapper.vm.charge()
    it('money',async()=>{
        await wrapper.vm.charge()
        expect(wrapper.vm.loading).toBe(false)
    })
})