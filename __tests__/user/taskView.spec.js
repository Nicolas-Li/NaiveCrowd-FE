import {shallowMount,config,createLocalVue} from '@vue/test-utils'
import TaskView from '@/components/task/user/TaskView'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import axios from 'axios'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
config.stubs.transition = false
jest.mock('axios')

describe('TaskView',()=>{
    const wrapper0 = shallowMount(TaskView,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
            $route:{
                params:{
                    task:{
                        id:1,
                        status:0
                    }
                },
            }
        }
    })
    wrapper0.vm.doTask()
    wrapper0.vm.favor()
    axios.post.mockResolvedValue({
        data:{
            type:'failed',
            message:'123',
        }
    })
    const wrapper = shallowMount(TaskView,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
            $route:{
                params:{
                    task:{
                        id:1,
                        status:0
                    }
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
    const wrapper2 = shallowMount(TaskView,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
            $route:{
                params:{
                    task:{
                        id:1,
                        status:0
                    }
                },
            }
        }
    })
    const wrapper3 = shallowMount(TaskView,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
            $route:{
                params:{
                    task:{
                        id:0,
                        status:0
                    }
                },
            }
        }
    })
    
    it('m',async()=>{
        wrapper.vm.doTask()
        wrapper.vm.favor()
    })
    axios.post.mockResolvedValue({
        data:{
            type:'failed',
            message:'123',
        }
    })
    wrapper.vm.doTask()
    wrapper.vm.favor()
    
})