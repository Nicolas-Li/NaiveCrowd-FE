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
            localVue
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
        wrapper[i].submitForm('x')
        wrapper[i].resetForm('x')

    }
})