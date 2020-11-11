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
                $message:{
                    error:function(a){},
                }
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
    it('can show button-content rightly', ()=> {
        expect(button.text()).toBe('进入配置')
    })
    it('can change button-content rightly',async ()=> {
        //await wrapper.findAll('.el-button').at(0).trigger('click')
        expect(button.text()).toBe('进入配置')
    })
    const wrapper1 = mount(Task, {localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
            $message:{
                error:function(a){},
            }
        },
        propsData: {
            task:{
                status: 1
            }
        }
    })
    const wrapperx = mount(Task, {localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
            $message:{
                error:function(a){},
            },
            $router:{
                push:function(a){}
            },
        },
        propsData: {
            task:{
                id: "3a4d567",
                title: "标题",
                intro: "介绍",
                status: 3,
                time: new Date().getTime()
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper1.findAll('.el-button').at(0).trigger('click')
    })
    it('can finish',async ()=> {
        
        await wrapperx.findAll('.el-button').at(0).trigger('click')
        Vue.nextTick(() => {
            expect (wrapperx.vm.task.status).toBe(3)
            
        })
    })

    const wrapper2 = mount(Task, {localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
            $message:{
                error:function(a){},
            }
        },
        propsData: {
            task:{
                status: 2
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper2.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper3 = mount(Task, {localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
            $message:{
                error:function(a){},
            },
            $router:{
                push:function(a){},
            },
        },
        propsData: {
            task:{
                status: 3
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper3.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper4 = mount(Task, {localVue,
        propsData: {
            task:{
                status: 4
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper4.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper5 = mount(Task, {localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
            $message:{
                error:function(a){},
            }
        },
        propsData: {
            task:{
                status: 5
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper5.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper6 = mount(Task, {localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
            $message:{
                error:function(a){},
                warning:function(a){},
            }
        },
        propsData: {
            task:{
                status: 6
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper6.findAll('.el-button').at(0).trigger('click')
    })
    const wrapper7 = mount(Task, {localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
            $message:{
                error:function(a){},
                warning:function(a){},
            }
        },
        propsData: {
            task:{
                status: 7
            }
        }
    })
    it('can show percentage rightly', async () =>{
        await wrapper7.findAll('.el-button').at(0).trigger('click')
    })
})