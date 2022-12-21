import React, { useEffect } from 'react';
import { bannerUpdate } from '@/api/cake';
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

const BannerEdit = (props) => {
  const [form] = Form.useForm();
  let { query } = props.location;
  let { data, loading, run } = useRequest(
    (value) => {
      // console.log('useRequest执行了',value);
      return bannerUpdate(query.objectId, value);
    },
    { manual: true },
  ); //开启手动执行

  const onFinish = (values) => {
    run(values); //手动执行useRequest
    message.success('更新成功');
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(query); //通过方法设置表单值
  }, []);

  useEffect(() => {
    //更新成功后返回列表页
    if (data) {
      // history.push('/banner/list')
      history.goBack();
    }
  }, [data]);

  // console.log('bannerEdit页面的props',data);
  return (
    <Spin spinning={loading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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
            更新
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default BannerEdit;
