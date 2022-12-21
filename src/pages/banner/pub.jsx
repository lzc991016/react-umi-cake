import React from 'react';
import { bannerAdd } from '@/api/cake';
import { Form, Input, Button, Spin, message } from 'antd';
import { useRequest, history } from 'umi';
import ImageUpload from '../../components/imgUpload';
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

const BannerPub = () => {
  const [form] = Form.useForm();
  let { data, loading, run } = useRequest(
    (value) => {
      return bannerAdd(value);
    },
    { manual: true },
  ); //开启手动执行
  const onFinish = (values) => {
    run(values); //手动执行useRequest
    message.success('发布成功');
    history.push('/banner/list');
  };
  const onReset = () => {
    form.resetFields();
  };

  let initData = {
    title: 'test',
    link: 'www.baidu.com',
  };

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        initialValues={initData}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="活动名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="link"
          label="活动链接"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imgurl"
          label="封面图片"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ImageUpload />
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

export default BannerPub;
