import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import ByMiniTasks from '@/components/task/demander/acceptance/ByMiniTasks'
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
    const wrapper = shallowMount(ByMiniTasks,{
        localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
        },
        propsData:{
            task:{
                id:1
            }
        }
    })

    //wrapper.setData({loading:true,money:100})

    it('money',async()=>{

        wrapper.vm.normalIndex(1,1)
        wrapper.vm.seeAnswersOfUsers(1,1)
        wrapper.vm.showAnswer()
        wrapper.vm.hideAnswer()
        wrapper.vm.seeAnswersOfUser(3)
        wrapper.vm.refuseAnswer()
        wrapper.vm.acceptAnswer()
    })

    
})