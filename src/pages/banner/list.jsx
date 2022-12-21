import React from 'react';
import { Table, Space, Button, Image, message } from 'antd';
import { bannerGet, bannerDelete } from '@/api/cake';
import { useRequest, history, useAccess } from 'umi';
export default function BannerList() {
  // let access = useAccess();
  const { data, loading, run } = useRequest(bannerGet);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '活动链接',
      dataIndex: 'link',
      key: 'link',
      render: (link) => (
        <a href={link} target="_blank">
          点击预览活动页
        </a>
      ),
    },
    {
      title: '活动封面',
      key: 'imgurl',
      dataIndex: 'imgurl',
      render: (imgurl) => <Image src={imgurl} height={50} />,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            // disabled={!access.isRoot}
            onClick={() => {
              history.push({
                pathname: '/banner/edit',
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
              bannerDelete(record.objectId).then((res) => {
                run(bannerGet);
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

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey="objectId"
    />
  );
}
