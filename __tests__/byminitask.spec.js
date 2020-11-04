import {mount,config,createLocalVue} from '@vue/test-utils'
import ByMiniTasks from '@/components/task/demander/acceptance/ByMiniTasks'
import ElementUI from 'element-ui'
import Vue from 'vue'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false

describe('ByMiniTasks',()=>{
    const wrapper = mount(ByMiniTasks, {localVue, propsData: {
        task:{
            id: 2
        }
    }})
    const buttons = wrapper.findAll('.el-button')
    it('has right button', async()=>{
        expect(buttons.length).toBe(3)
        await buttons.at(0).trigger('click')
        await buttons.at(1).trigger('click')
        await buttons.at(2).trigger('click')
        expect(buttons.at(0).text()).toBe("小任务0")
    })
})