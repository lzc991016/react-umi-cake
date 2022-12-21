import React, { useEffect } from 'react';
import { cateEdit } from '@/api/cake';
import { Form, Input, Button, Spin, message } from 'antd';
import { useRequest, history } from 'umi';
export default function CatePub(props) {
  const { location } = props;
  const query = location.query;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(query);
  });

  // 手动发动请求loading
  let { data, loading, run } = useRequest(
    (value) => {
      return cateEdit(query.objectId, value);
    },
    { manual: true },
  );
  // 重置
  const onReset = () => {
    form.resetFields();
  };
  // 提交
  const onFinish = async (values) => {
    await run(values);
    message.success('更新成功');
    history.push('/cate/list');
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
            更新
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
