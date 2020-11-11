import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import Distribute from '@/components/task/user/Distribute'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import Vue from 'vue'
import axios from 'axios'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
config.stubs.transition = false
jest.mock('axios')

describe('Distribute',()=>{
    const wrapper = shallowMount(Distribute,{
        localVue,
    })

    it('m',async()=>{
        axios.get.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
            }
        })
        wrapper.vm.getMiniTasksId()
        axios.get.mockResolvedValue({
            data:{
                type:'f',
                message:'123',
            }
        })
        wrapper.vm.getMiniTasksId()
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
                data:[]
            }
        })
        wrapper.vm.getMiniTasksId()
        wrapper.vm.submitAnswer('')
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
                data:[]
            }
        })
        wrapper.vm.getMiniTasksId()
        wrapper.vm.submitAnswer('')
        axios.post.mockResolvedValue({
            data:{
                type:'f',
                message:'123',
                data:[]
            }
        })
        wrapper.vm.getMiniTasksId()
        wrapper.vm.submitAnswer('')
    })
    
})