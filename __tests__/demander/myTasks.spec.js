import {mount,config,createLocalVue} from '@vue/test-utils'
import MyTasks from '@/components/task/demander/MyTasks'
import ElementUI from 'element-ui'
import axios from 'axios'
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false

jest.mock('axios')

describe('MyTasks',()=>{
    const wrapper = mount(MyTasks,{localVue,
        mocks:{
            $router:{
                push:function(path){
                }
            }
        },
    })
    it('have right buttons',async()=>{
        
        wrapper.vm.loadTask()
        expect(wrapper.findAll('.el-button').length).toBe(1)
    })
    it('tasklist',async()=>{
        axios.get.mockResolvedValue({
            data:{
                data:[
                    {id:1}
                ]
            }
        })
        wrapper.vm.loadTask()
        wrapper.vm.$nextTick(() => {
            //expect(wrapper.vm.taskList).toBe([])
            done()
          })
        wrapper.vm.createNewTask()
    })

    
})