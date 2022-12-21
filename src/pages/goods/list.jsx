import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import { goodsGet } from '../../api/cake';
const columns = [
  {
    title: '商品ID',
    dataIndex: 'objectId',
    valueType: 'objectId',
  },
  {
    title: '归属分类',
    dataIndex: 'bcname',
    valueType: 'select',
    fieldProps: {
      options: [
        {
          label: '蛋糕',
          value: '蛋糕',
        },
        {
          label: '面包',
          value: '面包',
        },
        {
          label: '小食',
          value: '小食',
        },
        {
          label: '配件',
          value: '配件',
        },
      ],
    },
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          var _a;
          (_a =
            action === null || action === void 0
              ? void 0
              : action.startEditable) === null || _a === void 0
            ? void 0
            : _a.call(action, record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() =>
          action === null || action === void 0 ? void 0 : action.reload()
        }
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];
const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
export default function GoodsList() {
  const actionRef = useRef();
  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log('111', params, sort, filter);
        return goodsGet(params);
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
}
