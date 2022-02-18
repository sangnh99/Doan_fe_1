// import React from "react";
// import axios from 'axios';
// import {Modal, Icon, Button, Upload} from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import authHeader from '../../services/auth-header';

// class PicturesWall extends React.Component {
//     state = {
//       previewVisible: false,
//       previewImage: "",
//       fileList: []
//     };

//     handleCancel = () => this.setState({ previewVisible: false });

//     handlePreview = file => {
//       this.setState({
//         previewImage: file.thumbUrl,
//         previewVisible: true
//       });
//     };

//     handleUpload = ({ fileList }) => {
//       //---------------^^^^^----------------
//       // this is equivalent to your "const img = event.target.files[0]"
//       // here, antd is giving you an array of files, just like event.target.files
//       // but the structure is a bit different that the original file
//       // the original file is located at the `originFileObj` key of each of this files
//       // so `event.target.files[0]` is actually fileList[0].originFileObj
//       console.log('fileList', fileList);

//       // you store them in state, so that you can make a http req with them later
//       this.setState({ fileList });
//     };

//     handleSubmit = event => {
//       event.preventDefault();

//       let formData = new FormData();
//       // add one or more of your files in FormData
//       // again, the original file is located at the `originFileObj` key
//     //   formData.append("files", this.state.fileList[0].originFileObj);
//     //   formData.append("files", this.state.fileList[1].originFileObj);
//     //   formData.append("files", this.state.fileList[2].originFileObj);
//     for (let i = 0; i < this.state.fileList.length; i ++){
//         formData.append("files", this.state.fileList[i].originFileObj);
//     }

//       axios
//         .post("http://localhost:8866/image/upload-images-antd", formData,  { headers : authHeader()})
//         .then(res => {
//           console.log("res", res);
//         })
//         .catch(err => {
//           console.log("err", err);
//         });
//     };

//     render() {
//       const { previewVisible, previewImage, fileList } = this.state;
//       const uploadButton = (
//         <div>
//           <PlusOutlined />
//           <div className="ant-upload-text">Upload</div>
//         </div>
//       );
//       return (
//         <div>
//           <Upload
//             listType="picture-card"
//             fileList={fileList}
//             onPreview={this.handlePreview}
//             onChange={this.handleUpload}
//             beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
//           >
//             {uploadButton}
//           </Upload>

//           <Button onClick={this.handleSubmit} // this button click will trigger the manual upload
//           >
//               Submit
//           </Button>

//           <Modal
//             visible={previewVisible}
//             footer={null}
//             onCancel={this.handleCancel}
//           >
//             <img alt="example" style={{ width: "100%" }} src={previewImage} />
//           </Modal>
//         </div>
//       );
//     }
//   }

//   export default PicturesWall;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Modal, Icon, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import authHeader from '../../services/auth-header';

export default function PicturesWall(props) {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);

    const handleCancelAntd = () => {
        setPreviewVisible(false)
    }

    const handlePreviewAntd = file => {
        setPreviewImage(file.thumbUrl);
        setPreviewVisible(true);
    };

    const handleUploadAntd = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleSubmit = event => {
        let formData = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            formData.append("files", fileList[i].originFileObj);
        }


        formData.append("comment", "this is comment");

        axios
            .post("http://localhost:8866/image/upload-images-antd", formData, { headers: authHeader() })
            .then(res => {
                console.log("res", res);
            })
            .catch(err => {
                console.log("err", err);
            });
    };

    return (
        <div>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreviewAntd}
                onChange={handleUploadAntd}
                beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
            >
                <div>
                    <PlusOutlined />
                    <div className="ant-upload-text">Upload</div>
                </div>
            </Upload>

            <Button onClick={handleSubmit} // this button click will trigger the manual upload
            >
                Submit
            </Button>

            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancelAntd}
            >
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>

        </div>
    );

}
