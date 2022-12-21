import React from 'react';
import { cateGet, goodsAdd, goodsExchange } from '@/api/cake';
import { Form, Input, Button, Spin, Select, message } from 'antd';
import { useRequest } from 'umi';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import RichEditor from '../../components/RichEditor';
import axios from 'axios';

const GoodsPub = () => {
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const [form] = Form.useForm();
  let { data, loading } = useRequest(cateGet);
  const onFinish = (values) => {
    goodsAdd(values);
  };
  const onReset = () => {
    form.resetFields();
    message.success('添加成功');
  };
  return (
    <Spin spinning={loading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="cateId"
          label="分类选择"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="请选择商品分类">
            {data?.map((item) => {
              return (
                <Option value={item.objectId} key={item.objectId}>
                  {item.catename}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="detail"
          label="商品详情"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <RichEditor />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default GoodsPub;
