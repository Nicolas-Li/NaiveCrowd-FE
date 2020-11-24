import {shallowMount,config,createLocalVue} from '@vue/test-utils'
import TaskSquare from '@/components/task/TaskSquare'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
config.stubs.transition = false
import axios from 'axios'
jest.mock('axios')

describe('TaskSquare',()=>{
    const wrapper = shallowMount(TaskSquare,{
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
                query:{
                    task: 0
                }
            }
        }
    })
    axios.post.mockResolvedValue({
        data:{
            type:'success',
            message:'123',
            data:[{id:0},{id:1}],
        }
    })
    const wrapper1 = shallowMount(TaskSquare,{
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
                query:{
                    task: 0
                }
            }
        }
    })
    wrapper.setData({
        canBeFavor: 0,
        status: -1,
        type: "0",
        tasks: [],
        allTasks: [1],
        favor: [],
    })
    wrapper.vm.change("x")
    it(' ', async()=>{
    })
})