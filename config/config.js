import { defineConfig } from 'umi';
import routes from './routes.js'
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd:{ //配置开启antd组件库的使用
    dark:false  //开启暗黑主题
  },
  layout: { //开启项目视图骨架配置
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: 'MCake-Admin',
    locale: true,
    layout: 'side',
  },
  dva:{  //启动dva进行状态管理
    immer:true
  },
  routes,
  fastRefresh: {},
});
