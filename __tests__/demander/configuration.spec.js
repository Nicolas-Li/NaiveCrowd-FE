import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import Configuration from '@/components/task/demander/Configuration'
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


describe('Configuration',()=>{
    const wrapper = shallowMount(Configuration,{
        localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0},
                back: function(a){}
            },
            $router:{
                params:{id:'1',status:0},
                back: function(a){}
            },
            $refs:{
                ruleForm:{
                    validateField:function(a){}
                },
                a:{
                    validate:function(){}
                }
            }
        }
    })
    var file={type:'text/plai'}
    wrapper.vm.beforeProblemsUpload(file)
    var file1={type:'text/plain'}
    //wrapper.vm.beforeProblemsUpload(file1)
    //wrapper.vm.submitForm('ruleForm')
    const button=wrapper.find('.el-button')

    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-input').length).toBe(0)
    })

    //wrapper.setData({loading:true,money:100})

    it('money',async()=>{
        axios.post.mockResolvedValue({
            data:{
                type:'success',
                templateUrl:'www.baidu.com',
                data:[
                    {id:1}
                ]
            }
        })
        wrapper.vm.downloadTemplate('1')
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                templateUrl:'www.baidu.com',
                data:[
                    {id:1}
                ]
            }
        })
        wrapper.vm.downloadTemplate('1')
        //wrapper.vm.miniTasksBonus()
        //wrapper.vm.showButton()
        wrapper.setData({ruleForm:{
            date: 0,
            time: 0,
            miniTasksType: "choice",
            problems: "[object File]",
            miniTasksNum: '2',
            miniTasksBonus1: '2',
            miniTasksBonus2: '2',
            miniTasksTime: '2',
            miniTasksLimit: 2,
        }})

        //wrapper.vm.handleProblemsRemove()
        wrapper.vm.downloadTemplate(file.type)
        //wrapper.vm.submitForm('ruleForm')
        //wrapper.vm.resetForm('ruleForm')
        // await wrapper.findAll('.el-button').at(0).trigger('click')
        // await wrapper.findAll('.el-button').at(1).trigger('click')
        // await wrapper.findAll('.el-button').at(2).trigger('click')
        //expect(wrapper.vm.task.title).toBe("任务标题")
    })
    const wrapper2 = shallowMount(Configuration,{
        localVue,
        mocks:{
            $route:{
                params:{id:'1',status:1},
                back: function(a){}
            },
            $router:{
                params:{id:'1',status:0},
                back: function(a){}
            },
            $refs:{
                ruleForm:{
                    validateField:function(a){}
                },
                a:{
                    validate:function(){}
                }
            }
        }
    })
    wrapper2.vm.beforeProblemsUpload(file)
    it('money',async()=>{
        axios.post.mockResolvedValue({
            data:{
                type:'success',
                templateUrl:'www.baidu.com',
                data:[
                    {id:1}
                ]
            }
        })
        wrapper2.vm.downloadTemplate('1')
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                templateUrl:'www.baidu.com',
                data:[
                    {id:1}
                ]
            }
        })
        wrapper2.vm.downloadTemplate('1')
        //wrapper2.vm.miniTasksBonus()
        //wrapper2.vm.showButton()
        wrapper2.setData({ruleForm:{
            date: 0,
            time: 0,
            miniTasksType: "choice",
            problems: "[object File]",
            miniTasksNum: '2',
            miniTasksBonus1: '2',
            miniTasksBonus2: '2',
            miniTasksTime: '2',
            miniTasksLimit: 2,
        }})

        //wrapper.vm.handleProblemsRemove()
        wrapper2.vm.downloadTemplate(file.type)
        wrapper2.vm.handleClose("C")
        wrapper2.vm.showInput()
        wrapper2.vm.handleInputConfirm()
        //npmwrapper2.vm.beforeProblemsUpload(file1)
        //wrapper.vm.submitForm('ruleForm')
        //wrapper.vm.resetForm('ruleForm')
        // await wrapper.findAll('.el-button').at(0).trigger('click')
        // await wrapper.findAll('.el-button').at(1).trigger('click')
        // await wrapper.findAll('.el-button').at(2).trigger('click')
        //expect(wrapper.vm.task.title).toBe("任务标题")
    })
})