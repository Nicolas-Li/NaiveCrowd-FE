import f from '@/net/task'
import axios from 'axios'
jest.mock('axios')

describe('task util', ()=>{
    f.loadAll()
    f.getFavor()
    f.createTask(1,1,1,1)
    f.configTask(1,1,1,1,1,1,1,1,1)
    it(' ', async()=>{
    })

})