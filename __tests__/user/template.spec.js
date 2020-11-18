import {shallowMount,config,createLocalVue} from '@vue/test-utils'
import DoTaskTemplate from '@/components/task/user/DoTaskTemplate'
import ElementUI from 'element-ui'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false
jest.mock('axios')

describe('template',()=>{
    const wrapper = shallowMount(DoTaskTemplate,{
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
            },
        }
    })
    it('has right id', ()=> {
        expect(wrapper.vm.currentPage).toBe(1)
    })

})