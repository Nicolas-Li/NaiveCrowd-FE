import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import Acceptance from '@/components/task/demander/acceptance/Acceptance'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
//import router from '../../src/router/router.js'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
config.stubs.transition = false


describe('Acceptance',()=>{
    const wrapper = shallowMount(Acceptance,{
        localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
        }
    })

    //wrapper.setData({loading:true,money:100})

    it('money',async()=>{

        wrapper.vm.assertTaskId()
        // wrapper.vm.seeAnswersOfUsers(1,1)
        // wrapper.vm.showAnswer()
        // wrapper.vm.hideAnswer()
        // wrapper.vm.seeAnswersOfUser(answerId)
        // wrapper.vm.normalIndex(3,1)
    })

    const wrapper2 = shallowMount(Acceptance,{
        localVue,
        mocks:{
            $route:{
                params:{id:'1',status:3}
            },
        }
    })
    it('money',async()=>{

        wrapper2.vm.assertTaskId()
    })
    
})