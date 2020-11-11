import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import ByMiniTasks from '@/components/task/demander/acceptance/ByMiniTasks'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
//import router from '../../src/router/router.js'
import Vue from 'vue'
import axios from 'axios'
jest.mock('axios')
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
            $message:{
                error:function(a){},
            }
        },
        propsData:{
            task:{
                id:1
            }
        }
    })

    //wrapper.setData({loading:true,money:100})

    it('money',async()=>{
        

        axios.post.mockResolvedValue({
            data:{
                type:'success',
                message:'123',
            }
        })
        wrapper.vm.seeMiniTasksOfTask()
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
            }
        })
        wrapper.vm.seeMiniTasksOfTask()
        axios.post.mockResolvedValue({
            data:{
                type:'f',
                message:'123',
            }
        })
        wrapper.vm.seeMiniTasksOfTask()

        axios.post.mockResolvedValue({
            data:{
                type:'success',
                message:'123',
                answersOfUsersIdList:'',
                problemList:'',
            }
        })
        wrapper.vm.seeAnswersOfUsers(1)
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
                answersOfUsersIdList:'',
                problemList:'',
            }
        })
        wrapper.vm.seeAnswersOfUsers(1)
        axios.post.mockResolvedValue({
            data:{
                type:'f',
                message:'123',
                answersOfUsersIdList:'',
                problemList:'',
            }
        })
        wrapper.vm.seeAnswersOfUsers(1)

        axios.post.mockResolvedValue({
            data:{
                type:'success',
                message:'123',
                userInfo:'',
                contentList:'',
            }
        })
        wrapper.vm.seeAnswersOfUser(1)
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
                userInfo:'',
                contentList:'',
            }
        })
        wrapper.vm.seeAnswersOfUser(1)
        axios.post.mockResolvedValue({
            data:{
                type:'f',
                message:'123',
                userInfo:'',
                contentList:'',
            }
        })
        wrapper.vm.seeAnswersOfUser(1)
        wrapper.setData({answerId:10})
        wrapper.vm.answerId=10
        wrapper.vm.seeAnswersOfUser(10)


        wrapper.vm.normalIndex(1,1)
        
        wrapper.vm.refuseAnswer()
        axios.post.mockResolvedValue({
            data:{
                type:'success',
                message:'123',
                userInfo:'',
                contentList:'',
            }
        })
        wrapper.vm.refuseAnswer()
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
                userInfo:'',
                contentList:'',
            }
        })
        wrapper.vm.refuseAnswer()
    })

    
})