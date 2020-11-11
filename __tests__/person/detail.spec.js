import {mount,config,createLocalVue} from '@vue/test-utils'
import Detail from '@/components/person/Detail'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import Vue from 'vue'
import axios from 'axios'
jest.mock('axios')
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
config.stubs.transition = false


describe('Detail',()=>{
    const wrapper = mount(Detail,{localVue})
    axios.get.mockResolvedValue({
        data:{
            type:'success',
            message:'123',
            sex:'man',
            email:'email',
            credit:100,
            money:300,
        }
    })
    axios.post.mockResolvedValue({
        data:{
            type:'success',
            message:'123',
            sex:'man',
        }
    })
    wrapper.vm.getInfo()
    wrapper.vm.confirmLogDel()
    axios.get.mockResolvedValue({
        data:{
            type:'failed',
            message:'123',
            sex:'man',
            email:'email',
            credit:100,
            money:300,
        }
    })
    axios.post.mockResolvedValue({
        data:{
            type:'failed',
            message:'123',
        }
    })
    wrapper.vm.getInfo()
    wrapper.vm.confirmLogDel()
    axios.get.mockResolvedValue({
        data:{
            type:'s',
            message:'123',
            sex:'man',
            email:'email',
            credit:100,
            money:300,
        }
    })
    axios.post.mockResolvedValue({
        data:{
            type:'s',
            message:'123',
        }
    })
    wrapper.vm.getInfo()
    wrapper.vm.confirmLogDel()

    axios.get.mockResolvedValue({
        data:{
            type:'success',
            message:'123',
            sex:"non-binary",
            email:'email',
            credit:0,
            money:0,
        }
    })
    wrapper.vm.getInfo()

    wrapper.vm.cancelLogDel()
    
    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-button').length).toBe(4)
    })

    wrapper.setData({
        name: "unknown",
        email: "unknown",
        sex: "unknown",
        credit: 0,
        money: 0,
        dialogVisible: false,
        password: null
    })

    
})