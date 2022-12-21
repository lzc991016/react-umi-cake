import mockjs from 'mockjs';
let datalist = mockjs.mock({
  code: 200,
  msg: '学员列表加载成功',
  'results|100': [
    {
      'objectId|+1': 1,
      name: '@cname',
      score: '@integer(50,100)',
      city: '@city',
      time: '@date',
    },
  ],
});

export default {
  'GET /classes/stu': datalist,
  'DELETE /classes/stu': (req, res) => {
    const { id } = req.query;
    datalist.results.filter((item) => {
      return item.objectId != id;
    });
    res.send({
      code: 200,
      msg: '删除成功',
    });
    return;
  },
};
