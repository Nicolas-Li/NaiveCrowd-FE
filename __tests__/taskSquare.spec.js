import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import TaskSquare from '@/components/task/TaskSquare'
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
    it('has right id', ()=> {
        expect(wrapper.vm.canBeFavor).toBe(0)
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
})