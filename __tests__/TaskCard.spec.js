import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import TaskCard from '@/components/task/TaskCard'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import axios from 'axios'
//import router from '../../src/router/router.js'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
//localVue.use(VueRouter)
localVue.use(VueCookies)
config.stubs.transition = false
jest.mock('axios')


describe('TaskCard',()=>{
    const wrapper =  shallowMount(TaskCard,{
        localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0},
                back: function(a){}
            },
            $router:{
                params:{id:'1',status:0},
                back: function(a){},
                push: function(a){}
            },
            $refs:{
                ruleForm:{
                    validateField:function(a){}
                },
                a:{
                    validate:function(){}
                }
            }
        },
        propsData:{
            task:{
                title: 1,
                cover: 0
            }
        }
    })
    it('has right button', ()=> {
        expect(wrapper.findAll(".el-button").length).toBe(0)
        wrapper.vm.goToTaskView()
    })
    
})