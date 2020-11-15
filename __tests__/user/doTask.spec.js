import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import DoTask from '@/components/task/user/DoTask'
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
                query:{
                    task: 0
                }
            }
        }
    })
    it('has right id', ()=> {
        expect(wrapper.vm.miniTaskId).toBe(1)
    })
    
    wrapper.setData({
        miniTaskId: 1,
        problemList: [1, 2, 3],
    })
    wrapper.vm.submitAnswer([null, null, null])
})