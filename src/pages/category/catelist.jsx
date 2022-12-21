import React from 'react';
import { Table, Space, Button, Image, message } from 'antd';
import { cateGet, cateDelete } from '@/api/cake';
import { useRequest, history } from 'umi';
export default function CateList() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '分类名称',
      dataIndex: 'catename',
      key: 'catename',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => {
              history.push({
                pathname: '/cate/edit',
                query: record,
              });
            }}
          >
            编辑
          </Button>
          <Button
            type="primary"
            size="small"
            danger
            onClick={() => {
              cateDelete(record.objectId).then((res) => {
                run(cateGet);
                message.success('删除成功');
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const { data, loading, run } = useRequest(cateGet);
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey="objectId"
    />
  );
}
