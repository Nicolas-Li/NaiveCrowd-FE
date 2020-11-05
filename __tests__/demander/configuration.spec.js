import {shallowMount,mount,config,createLocalVue} from '@vue/test-utils'
import Configuration from '@/components/task/demander/Configuration'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
//import router from '../../src/router/router.js'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
//localVue.use(VueRouter)
localVue.use(VueCookies)
config.stubs.transition = false


describe('Configuration',()=>{
    const wrapper = shallowMount(Configuration,{
        localVue,
        mocks:{
            $route:{
                params:{id:'1',status:0}
            },
        }
    })
    const button=wrapper.find('.el-button')

    it('have right buttons',()=>{
        expect(wrapper.findAll('.el-input').length).toBe(0)
    })

    //wrapper.setData({loading:true,money:100})

    it('money',async()=>{
        wrapper.vm.deadline
        wrapper.vm.miniTasksBonus
        wrapper.vm.showButton
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
        var file={type:'text/plai'}
        wrapper.vm.beforeProblemsUpload(file)
        //wrapper.vm.handleProblemsRemove()
        wrapper.vm.downloadTemplate(file.type)
        //wrapper.vm.submitForm('ruleForm')
        //wrapper.vm.resetForm('ruleForm')
        // await wrapper.findAll('.el-button').at(0).trigger('click')
        // await wrapper.findAll('.el-button').at(1).trigger('click')
        // await wrapper.findAll('.el-button').at(2).trigger('click')
        //expect(wrapper.vm.task.title).toBe("任务标题")
    })

    
})