import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload, Modal, notification, Button, Form } from 'antd';
import imageService from '../../services/image-service';


const { Dragger } = Upload;

export const RestUpload = ({
    name,
    form,
    data
}) => {
    const [image, setImage] = useState('');
    console.log('upload', form.getFieldsValue())
    //   const handleCancel = () => {
    //     setPreviewVisible(false);
    //   };

    //   const handlePreview = (file) => {
    //     setPreviewVisible(true);
    //     setPreviewImage(file.url || file.thumbUrl);
    //   };



    const uploadButton = (
        // fileList && fileList.length === 0 ? (
        <div className="uploadArea">
            <div className="ant-upload-text">
                {/* <div>
          <SVGIcon size={30} type="upload" />
        </div> */}
                <Button type="primary">Upload</Button>
            </div>
        </div>
    );
    // ) : null;

    useEffect(
        () => {
            setImage(
                data
                    ? data.avatar
                    : [],
            );

        },
        // eslint-disable-next-line
        [
            // defaultSourceKey,
            // onSetDefault,
            data,
            // props.record,
            // props.record.id,
            // props.source,
        ],
    );

    const customRequest = async ({ onSuccess, file }) => {
        try {
            // TODO: upload
            //   const responseS3 = await getUrl(compressedFile.name, compressedFile.type);
            //   const response = await uploadMedia(responseS3.uploadUrl, compressedFile);
            // setImage(url)
            // form && form.setFieldsValue({
            //     [name]: url
            // })
            const formData = new FormData();
            formData.append('filea', file);
            const response = await imageService.postImageUserAvatar(formData, JSON.parse(localStorage.getItem("user")).id);
            console.log("this is respone :" + response.data.data)
            setImage(response.data.data)
            form && form.setFieldsValue({
                [name]: response.data.data
            })
        } catch (error) {
            //
        }
    };

    console.log('fileList', image)
    return (
        <div
        >

            <div>
                {form && (
                    <Form.Item
                        name={name}
                    // style={{ display: 'none' }}
                    >
                        <input style={{ display: 'none' }} />
                    </Form.Item>
                )}
                <div className="upload-file-wrapper">
                    <Dragger
                        customRequest={customRequest}
                        // action={`${process.env.REACT_APP_UPLOAD_PHOTO_URL}`}
                        // headers={{
                        //   'x-requested-with': undefined,
                        //   Authorization: Client-ID ${process.env.REACT_APP_UPLOAD_PHOTO_KEY},
                        // }}
                        accept="image/*"
                        listType="picture-card"
                        fileList={[image]}
                        showUploadList={false}
                    >
                        {image && (
                            <img src={image} style={{ backgroundSize: "cover", width: "100%", height: 270 }} />
                        )}
                        {uploadButton}
                    </Dragger>

                </div>
                {/* <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            style={{ width: '100%' }}
            src={previewImage ? getImageUrl(previewImage) : ''}
          />
        </Modal> */}
            </div>
        </div>
    );
};

const makeFileList = (values) =>
    Array.isArray(values)
        ? values.map((value) =>
            value && value.url
                ? value
                : {
                    uid: value,
                    status: 'done',
                    ...(typeof value === 'string' && {
                        name: value,
                        url: value,
                    }),
                },
        )
        : [];

RestUpload.propTypes = {
    source: PropTypes.string,
    parentSource: PropTypes.string,
    record: PropTypes.object,
    defaultValue: PropTypes.any,
    multiple: PropTypes.bool,
    form: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultSourceKey: PropTypes.string,
    accept: PropTypes.string,
    required: PropTypes.bool,
    isGetName: PropTypes.bool,
    deleteAction: PropTypes.func,
};

RestUpload.defaultProps = {
    multiple: true,
};

export default RestUpload;