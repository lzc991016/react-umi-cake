import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Cloud from 'leancloud-storage';
function getBase64(img, callback) {
  //将本地资源对象，转换为base64编码
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class ImageUpload extends React.Component {
  state = {
    //类组件内部属性的简写
    loading: false,
  };

  // handleChange = info => {  //检测action接口的上传进度
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl =>
  //       this.setState({
  //         imageUrl,
  //         loading: false,
  //       }),
  //     );
  //   }
  // };

  customUpload = (info) => {
    //图片自定义上传函数
    console.log(info); //info.file可以提取本地图片资源对象
    //图片base64编码
    getBase64(info.file, (base64) => {
      //将本地资源对象，转换为base64编码};
      // resume.txt 是文件名
      const file = new Cloud.File('cakeimg.png', { base64 }); //将本地资源转化为一个可以向leancloud平台提交的资源
      file.save().then((res) => {
        //上传图片资源
        // console.log(res);
        let { url } = res.attributes;
        this.props.onChange(url); //将图片链接传给父级
        this.setState({
          loading: false,
          imageUrl: url, //预览在线图片
        });
      });
    });
  };

  render() {
    const { loading, imageUrl } = this.state;
    // console.log('ImgUpload组件的props',this.props);
    let { value } = this.props; //尝试提取默认预览图
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={this.customUpload}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl || value ? (
          <img src={imageUrl || value} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default ImageUpload;
