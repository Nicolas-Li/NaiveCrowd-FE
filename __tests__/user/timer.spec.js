import {shallowMount,config,createLocalVue} from '@vue/test-utils'
import Timer from '@/components/task/user/Timer'
import ElementUI from 'element-ui'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false
jest.mock('axios')

describe('timer',()=>{
    const wrapper = shallowMount(Timer,{
        localVue,
        propsData: {
            maxTime:8000
        },
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
                query:{
                    task: 0
                }
            },
        }
    })
    it('has right id', ()=> {
        wrapper.setData({minutes: 0,
            seconds: 0,})
        wrapper.vm.startTimer()
        wrapper.setData({minutes: 10000,
            seconds: 100,})
        wrapper.vm.startTimer()
        wrapper.setData({minutes: 61,
            seconds: 100,})
        wrapper.vm.startTimer()
        wrapper.vm.stop()
        wrapper.vm.start()
        wrapper.vm.maxtime+=1
        wrapper.vm.resetMaxTime(100000)
    })
    const wrapper2 = shallowMount(Timer,{
        localVue,
        propsData: {
            maxTime:8000
        },
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
                query:{
                    task: 0
                }
            },
        }
    })
    wrapper2.vm.maxTime=100
    wrapper2.vm.maxTime=0
})