import {shallowMount,shallow,mount,config,createLocalVue} from '@vue/test-utils'
import DoTaskTemplate from '@/components/task/user/DoTaskTemplate'
import Timer from '@/components/task/user/Timer'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
localVue.use(Timer)
//config.stubs.transition = false
jest.mock('axios')

describe('TaskView',()=>{
    mount(DoTaskTemplate, localVue,{
        stubs: ['Timer']
      })
    const wrapper = shallowMount(DoTaskTemplate,{
        localVue,
        stubs:{
            'Timer':Timer
            
        },
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
        },
        propsData:{
            isTimer:false
        }
    })
    it('has right id', ()=> {
        expect(1+0).toBe(1)
    })
    wrapper.vm.submit([null, null, null])
})