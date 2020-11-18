import {shallowMount,config,createLocalVue} from '@vue/test-utils'
import TaskView from '@/components/task/user/TaskView'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
config.stubs.transition = false
jest.mock('axios')

describe('TaskView',()=>{
    const wrapper = shallowMount(TaskView,{
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
                    task: {
                        id: 1,
                    }
                }
            }
        }
    })
    it('m',async()=>{
        wrapper.vm.doTask()
    })
    wrapper.vm.favor()
    
})