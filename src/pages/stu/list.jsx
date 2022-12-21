import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { stuGet, stuDel } from '@/api/stu';
import { useRequest } from 'umi';
export default function StuList() {
  const { data, loading, error } = useRequest(stuGet);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '生日',
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button type="primary" size="small">
            编辑
          </Button>
          <Button
            type="primary"
            size="small"
            danger
            onClick={() => {
              stuDel(record.objectId).then((res) => {
                //删除线上
                data.splice(index, 1); //更新线下
                setData([...data]);
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="objectId"
    />
  );
}
