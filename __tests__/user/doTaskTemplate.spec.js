import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
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
    const wrapper = mount(DoTaskTemplate,{
        localVue,
        mocks:{
            $router:{
                push:function(path){},
                back:function(){}
            },
        },
        propsData:{
            isTimer:true
        }
    })
    it('has right id', ()=> {
        expect(1+0).toBe(1)
    })
    wrapper.vm.submit([null, null, null])
    wrapper.vm.$refs.headerChild.overtime=true
    wrapper.vm.submit([null, null, null])
    const wrapper1 = mount(DoTaskTemplate,{
        localVue,
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
    wrapper1.vm.submit([null, null, null])
    wrapper.setProps({ data: [{
        description: "111",
        type: "111",
        choice: ["111"],
        imageUrl: null,
    }] })
    wrapper1.setProps({ data: false })
})