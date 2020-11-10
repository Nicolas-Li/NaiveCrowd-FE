import {mount,config,createLocalVue} from '@vue/test-utils'
import Task from '@/components/task/demander/Task'
import ElementUI from 'element-ui'
import Vue from 'vue'
import axios from 'axios'
jest.mock('axios')
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false


describe('Task',()=>{
    axios.post.mockResolvedValue({
        data:{
            type:'success',
            message:'123',
            taskMoney:10,
            demanderMoney:1,
            answersNum:1,
            totalNum:1,
        }
    })
    const wrapper=[]
    for(var i=0;i<=5;i=i+1){
        wrapper[i] = mount(Task,{
            localVue,
            mocks:{
                $route:{
                    push:function(a){}
                },
                $router:{
                    push:function(a){}
                },
            },
            propsData:{
                task:{
                    status:i
                }
            }
        })
        wrapper[i].setData({percentage:10})
        wrapper[i].vm.chooseTask()
    }

    axios.post.mockResolvedValue({
        data:{
            type:'failed',
            message:'123',
            taskMoney:10,
            demanderMoney:1,
            answersNum:1,
            totalNum:1,
        }
    })
    for(var i=0;i<=5;i=i+1){
        wrapper[i].vm.chooseTask()
    }

    axios.post.mockResolvedValue({
        data:{
            type:'success',
            message:'123',
            taskMoney:1,
            demanderMoney:10,
            answersNum:1,
            totalNum:1,
        }
    })
    for(var i=0;i<=5;i=i+1){
        wrapper[i].vm.chooseTask()
    }

    axios.post.mockResolvedValue({
        data:{
            type:'f',
            message:'123',
            taskMoney:10,
            demanderMoney:1,
            answersNum:1,
            totalNum:1,
        }
    })
    for(var i=0;i<=5;i=i+1){
        wrapper[i].vm.chooseTask()
    }
    
    const button=wrapper[0].find('.el-button')


    it('have right buttons',()=>{
        
    })

    //wrapper.setData({loading:true,money:100})

    // it('money',async()=>{
    //     await button.trigger('click')
    //     expect(wrapper.vm.money).toBe(100)
    // })

    
})