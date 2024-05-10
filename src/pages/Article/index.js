import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Space, Table, Tag, Popconfirm, message } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import useChannels from '@/hooks/useChannel'

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'
import { getArticleListApi, deleteArticleListApi } from '@/api/article'
import { useEffect, useState } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const { channleList } = useChannels()
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState([])

  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4
  })

  const getList = async (reqData) => {
    const result = await getArticleListApi(reqData)
    setArticleList(result.data.data.results)
    setCount(result.data.data.total_count)
  }

  useEffect(() => {
    getList(reqData)
  }, [reqData])
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="green">审核通过</Tag>
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Popconfirm
              title="删除"
              description="确定要删除当前文章吗?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            ><Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>

          </Space>
        )
      }
    }
  ]

    const onConfirm = async (data) => {
      const result = await deleteArticleListApi(data.id)
      if (result.data.message === 'OK'){
        setReqData({
          ...reqData
        })
        message.success('删除成功')
      } else {
        message.error('删除失败')
      }
      
    }

  const onFinish = (formValue) => {
    setReqData({
      ...reqData,
      channel_id: formValue.channel_id,
      status: formValue.status,
      begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate: formValue.date[1].format('YYYY-MM-DD')
    })
  }

  const onChangePage = (page) => {
    setReqData({
      ...reqData,
      page: page.current,
      per_page: page.pageSize
    })
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            separator=">"
            items={[
              {
                title: '首页',
                href: '/home'
              },
              {
                title: '内容管理'
              }
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: -1 }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {
                channleList.length && channleList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleList}
          pagination={{
            total: count,
            pageSize: reqData.per_page
          }}
          onChange={onChangePage}
        />
      </Card>
    </div>
  )
}

export default Article