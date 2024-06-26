import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleApi, getArticleApi, updateArticleApi } from '@/api/article'
import useChannels from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {

  const { channleList } = useChannels()

  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }

  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    setImageList(value.fileList)
  }
  const navigate = useNavigate()
  const createArticle = async (formValue) => {
    if (imageList.length !== imageType) return message.error('封面类型和图片数量不匹配')
    const { title, content, channel_id } = formValue
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => {
          if(item.response){
            return item.response.data.url
          } else {
            return item.url
          }
        })
      },
      channel_id
    }
    if(articleId){
      await updateArticleApi({...reqData, id: articleId})
      message.success('文章编辑成功')
    } else {
      await createArticleApi(reqData)
      message.success('文章发布成功')
    }
    
    navigate('/article')
  }
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()


  useEffect(() => {
    const getArticleById = async () => {
      if(!articleId) return
      const result = await getArticleApi(articleId)
      const data = result.data.data
      form.setFieldsValue({
        ...data,
        type: data.cover.type
      })
      setImageType(data.cover.type)
      setImageList(data.cover.images.map(url => {
        return {
          url
        }
      }))
    }
    getArticleById()
  }, [articleId, form])

  return (
    <div className="publish">
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
                title: articleId ? '编辑文章' :'发布文章'
              }
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={createArticle}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {
                channleList.length && channleList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {
              imageType > 0 && <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            }

          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish