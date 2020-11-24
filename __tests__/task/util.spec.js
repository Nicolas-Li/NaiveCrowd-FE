import util from '@/components/task/util'
import axios from 'axios'
jest.mock('axios')

describe('task util', ()=>{
    var that={task:{id:0},loading:true}
    it(' ', async()=>{
        util.getTaskProgress(that)
        axios.post.mockResolvedValue({
            data:{
                type:'success',
                message:'123',
                answersNum:100,
                totalNum:100,
            }
        })
        util.getTaskProgress(that)
        axios.post.mockResolvedValue({
            data:{
                type:'failed',
                message:'123',
            }
        })
        util.getTaskProgress(that)
        axios.post.mockResolvedValue({
            data:{
                type:' ',
                message:'123',
            }
        })
        util.getTaskProgress(that)
    })
    util.showStatus(1)
    util.showDate({task:{time:10}})
    var ts={$refs:[{
        resetFields(){},
        validate(valid){return valid}
    }]}
    util.resetForm(ts,0)
    util.submitForm(ts,0,1)
})