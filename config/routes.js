export default [
  //配置式路由

  {
    path: '/',
    component: '@/pages/index',
    name: '首页',
    hideInMenu: true,
  },
  {
    path: '/test',
    component: '@/pages/test/index',
    icon: 'GitlabOutlined',
    name: '测试',
  },
  {
    path: '/stu',
    name: '学员管理',
    icon: 'AliwangwangOutlined',
    routes: [
      {
        path: '/stu/list',
        name: '学员列表',
        component: '@/pages/stu/list',
      },
      {
        path: '/stu/pub',
        name: '学员录入',
        component: '@/pages/stu/pub',
      },
    ],
  },
  {
    path: '/cate',
    name: '分类管理',
    icon: 'WindowsOutlined',
    access: 'isAdmin',
    routes: [
      {
        path: '/cate/list',
        component: '@/pages/category/catelist',
        name: '分类列表',
        access: 'isAdmin',
      },
      {
        path: '/cate/pub',
        component: '@/pages/category/catepub',
        name: '分类发布',
        access: 'unAdmin',
      },
      {
        path: '/cate/edit',
        component: '@/pages/category/cateedit',
        name: '分类编辑',
        hideInMenu: true,
        access: 'unAdmin',
      },
    ],
  },
  {
    path: '/banner',
    name: '轮播管理',
    icon: 'RadarChartOutlined',
    access: 'isAdmin',
    routes: [
      {
        path: '/banner/list',
        component: '@/pages/banner/list',
        name: '轮播列表',
      },
      {
        path: '/banner/pub',
        component: '@/pages/banner/pub',
        name: '轮播发布',
      },
      {
        path: '/banner/edit',
        component: '@/pages/banner/edit',
        name: '轮播编辑',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/goods',
    name: '商品管理',
    icon: 'CodeSandboxOutlined',
    access: 'isAdmin',
    routes: [
      {
        path: '/goods/list',
        component: '@/pages/goods/list',
        name: '商品列表',
      },
      {
        path: '/goods/pub',
        component: '@/pages/goods/pub',
        name: '商品发布',
      },
    ],
  },
];
