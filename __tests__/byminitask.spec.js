import {mount,config,createLocalVue} from '@vue/test-utils'
import ByMiniTasks from '@/components/task/demander/acceptance/ByMiniTasks'
import ElementUI from 'element-ui'
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
        expect(buttons.length).toBe(1)
        await buttons.at(0).trigger('click')
    })
})