import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import Distribute from '@/components/task/user/Distribute'
import DoTaskTemplate from '@/components/task/user/DoTaskTemplate'
import Timer from '@/components/task/user/Timer'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import axios from 'axios'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
localVue.use(DoTaskTemplate)
localVue.use(Timer)
config.stubs.transition = false
jest.mock('axios')

describe('Distribute',()=>{
    const wrapper = shallowMount(Distribute,{
        localVue,
    })
    wrapper.setData({task:{id:1}})
    it('m',async()=>{
        wrapper.vm.getTask()
        wrapper.vm.getMiniTaskByTask()
        wrapper.vm.submitAnswer()
        axios.get.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
            }
        })
        wrapper.vm.getTask()
        wrapper.vm.getMiniTaskByTask()
        axios.get.mockResolvedValue({
            data:{
                type:'f',
                message:'123',
            }
        })
        wrapper.vm.getTask()
        wrapper.vm.getMiniTaskByTask()
        axios.get.mockResolvedValue({
            data:{
                type:'success',
                message:'123',
                id:1,
            }
        })
        axios.post.mockResolvedValue({
            data:{
                type:'success',
                message:'123',
                data:['1']
            }
        })
        wrapper.vm.getTask()
        wrapper.vm.getMiniTaskByTask()
        wrapper.vm.submitAnswer('')
        wrapper.vm.problemList=['1','1']
        
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
                data:[]
            }
        })
        wrapper.vm.getTask()
        wrapper.vm.getMiniTaskByTask()
        wrapper.vm.submitAnswer('')
        axios.post.mockResolvedValue({
            data:{
                type:'f',
                message:'123',
                data:[]
            }
        })
        wrapper.vm.getTask()
        wrapper.vm.getMiniTaskByTask()
        wrapper.vm.submitAnswer('')
        wrapper.vm.showDate
    })
    
})