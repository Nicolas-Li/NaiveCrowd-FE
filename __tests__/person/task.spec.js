import {mount,config,createLocalVue} from '@vue/test-utils'
import Task from '@/components/task/user/Task'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false

describe('userTask', ()=>{
    const wrapper = mount(Task, {localVue,
        mocks:{
            $route:{
                push:function(a){}
            },
            $router:{
                push:function(a){}
            },
            $message:{
                error:function(a){},
            },
            $refs:{
                validate:function(a){return false},
                'a':{
                    validate:function(a){return false}
                }
            }
        },})
    const buttons = wrapper.findAll('.el-button')
    it('has right buttons', async()=>{
        expect(buttons.length).toBe(1)
        expect(buttons.at(0).text()).toBe("查看详情")
        await buttons.at(0).trigger('click')
    })
})