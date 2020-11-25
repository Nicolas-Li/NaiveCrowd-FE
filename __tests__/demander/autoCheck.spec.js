import {shallowMount,config,createLocalVue} from '@vue/test-utils'
import AutoCheck from '@/components/task/demander/acceptance/AutoCheck'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import axios from 'axios'
const localVue=createLocalVue()
localVue.use(ElementUI)
localVue.use(VueCookies)
config.stubs.transition = false
jest.mock('axios')

describe('Acceptance',()=>{
    const wrapper = shallowMount(AutoCheck,{
        localVue,
        propsData:{
            task:{
                id:1
            }
        }
    })
    wrapper.vm.autoCheck()
    wrapper.vm.refuseAnswer()
    wrapper.vm.seeAnswersOfUser(1)

    it('money',async()=>{
        axios.post.mockResolvedValue({
            data:{
                type:'success',
                message:'123',
            }
        })
        wrapper.vm.autoCheck()
        wrapper.vm.refuseAnswer()
        wrapper.vm.seeAnswersOfUser(1)
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
            }
        })
        wrapper.vm.autoCheck()
        wrapper.vm.refuseAnswer()
        wrapper.vm.seeAnswersOfUser(1)
        axios.post.mockResolvedValue({
            data:{
                type:'f',
                message:'123',
            }
        })
        wrapper.vm.autoCheck()
        wrapper.vm.refuseAnswer()
        wrapper.vm.seeAnswersOfUser(1)
    })
    
})