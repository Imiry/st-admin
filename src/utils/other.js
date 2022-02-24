//  data1数据格式转换为newData格式  -》找自己的儿子，为自己的儿子搭建一个list房屋让儿子们住   
//  is_p: 1  代表老爸   is_p: 0  代表儿子
let data1 = [
  {
    is_p: 1,
    name: '老爸1',
    c_id: '001'
  },
  {
    is_p: 0,
    name: '001儿子',
    c_id: '001'
  },
  {
    is_p: 0,
    name: '002儿子',
    c_id: '002'
  },
  {
    is_p: 1,
    name: '老爸2',
    c_id: '002'
  },
  {
    is_p: 0,
    name: '002儿子',
    c_id: '002'
  },
  {
    is_p: 0,
    name: '001儿子',
    c_id: '001'
  },
]

const newData = [
  {
    is_p: 1,
    c_id: '001',
    name: '老爸1',
    list: [
      {
        is_p: 0,
        name: '001儿子',
        c_id: '001'
      },
      {
        is_p: 0,
        name: '001儿子',
        c_id: '001'
      }
    ]
  },
  {
    is_p: 1,
    c_id: '002',
    name: '老爸2',
    list: [
      {
        is_p: 0,
        name: '002儿子',
        c_id: '002'
      },
      {
        is_p: 0,
        name: '002儿子',
        c_id: '002'
      }
    ]
  }
]