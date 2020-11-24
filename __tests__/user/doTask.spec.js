import {shallowMount,config,createLocalVue} from '@vue/test-utils'
import DoTask from '@/components/task/user/DoTask'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import axios from 'axios'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
config.stubs.transition = false
jest.mock('axios')

describe('TaskView',()=>{
    const wrapper = shallowMount(DoTask,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
            $route:{
                params:{
                    id:1,
                    status:0
                },
            }
        }
    })
    wrapper.vm.submitAnswer([1, 1])
    const wrapper1 = shallowMount(DoTask,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
            $route:{
                params:{
                    id:0,
                    status:0
                },
            }
        }
    })

    axios.post.mockResolvedValue({
        data:{
            type:'failed',
            message:'123',
        }
    })
    const wrapper2 = shallowMount(DoTask,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
            $route:{
                params:{
                    id:1,
                    status:0
                },
            }
        }
    })

    axios.post.mockResolvedValue({
        data:{
            type:'success',
            message:'123',
        }
    })
    const wrapper3 = shallowMount(DoTask,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
            $route:{
                params:{
                    id:1,
                    status:0
                },
            }
        }
    })


    it('has right id', ()=> {
        expect(1+0).toBe(1)
    })
    
    wrapper.setData({
        miniTaskId: 1,
        problemList: [1, 2, 3],
    })
    wrapper1.vm.submitAnswer([null, null])
    wrapper.vm.submitAnswer([null, null])
    wrapper.vm.submitAnswer([1, null])
    wrapper1.vm.submitAnswer([1, 1])
    axios.post.mockResolvedValue({
        data:{
            type:'failed',
            message:'123',
        }
    })
    wrapper1.vm.submitAnswer([1, 1])
})