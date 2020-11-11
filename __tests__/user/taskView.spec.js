import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import TaskView from '@/components/task/user/TaskView'
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
                    task: 0
                }
            }
        }
    })
    const wrapper1 = shallowMount(TaskView,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
            $route:{
                params:{
                    id:1,
                    status:1
                },
                query:{
                    task: 0
                }
            }
        }
    })

    it('m',async()=>{
        wrapper.vm.doTask()
    })
    
})