import {mount,config,createLocalVue} from '@vue/test-utils'
import Creation from '@/components/task/demander/Creation'
import ElementUI from 'element-ui'
import Vue from 'vue'
import axios from 'axios'
jest.mock('axios')
const localVue=createLocalVue()
localVue.use(ElementUI)
config.stubs.transition = false

describe('Creation', ()=> {


    const wrapper=[]
    for(var i=0;i<=5;i=i+1){
        wrapper[i] = mount(Creation,{
            localVue,
            mocks:{
                $route:{
                    push:function(a){}
                },
                $router:{
                    push:function(a){}
                },
                $message:{
                    error:function(a){},
                },
                $refs:{
                    validate:function(a){return false},
                    'a':{
                        validate:function(a){return false}
                    }
                }
            },
        })
        wrapper[i].vm.beforeCoverUpload({
            size: 1,
            type: 'image/jpeg'
        })
        wrapper[i].vm.beforeCoverUpload({
            size: 10000000,
            type: 'image/jpe'
        })
        wrapper[i].vm.handleCoverRemove()
        //wrapper[i].vm.submitForm()
        //wrapper[i].vm.resetForm('')
        wrapper[i].setData({isSubmitting: true})
        

    }
    it('has right button', async()=>{
            expect(wrapper[0].findAll('.el-button').length).toBe(3)
    })
})