import React from 'react';
import { cateAdd } from '@/api/cake';
import { Form, Input, Button, Spin, message } from 'antd';
import { useRequest } from 'umi';
export default function CatePub() {
  const [form] = Form.useForm();

  // 手动发动请求loading
  let { data, loading, run } = useRequest(
    (value) => {
      return cateAdd(value);
    },
    { manual: true },
  );
  // 重置
  const onReset = () => {
    form.resetFields();
  };
  // 提交
  const onFinish = (values) => {
    run(values);
    message.success('添加成功');
  };
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
  return (
    <Spin spinning={loading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="catename"
          label="分类名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
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
}
