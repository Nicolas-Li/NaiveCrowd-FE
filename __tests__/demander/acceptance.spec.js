import {shallowMount,config,createLocalVue} from '@vue/test-utils'
import Acceptance from '@/components/task/demander/acceptance/Acceptance'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import axios from 'axios'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
config.stubs.transition = false
jest.mock('axios')

describe('Acceptance',()=>{
    const wrapper = shallowMount(Acceptance,{
        localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0},
                back:function(){},
                push:function(path){}
            },
            $router:{
                back:function(){}
            },
        }
    })

    it('money',async()=>{
        axios.post.mockResolvedValue({
            data:{
                type:'success',
                message:'123',
            }
        })
        wrapper.vm.assertTaskId()
        wrapper.vm.settleTask()
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
            }
        })
        wrapper.vm.settleTask()
        axios.post.mockResolvedValue({
            data:{
                type:'f',
                message:'123',
            }
        })
        wrapper.vm.settleTask()
    })

    const wrapper2 = shallowMount(Acceptance,{
        localVue,
        mocks:{
            $route:{
                params:{id:'1',status:3}
            },
            $router:{
                back:function(){}
            },
        }
    })
    it('m',async()=>{

        wrapper2.vm.assertTaskId()
        
    })
    
})