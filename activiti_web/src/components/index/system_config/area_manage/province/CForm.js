import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, Row, Col } from 'antd';
import styles from '../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../utils/tool/util.js';

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };

const CForm = ({
  item = [],
  onSubmit,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = { ...getFieldsValue(), id: item.id };
      data = util.dealData(data);
      onSubmit(data);
    });
  }

  function deleteItem(data, key) {
    for(let i = 0; i < data.length; i++) {
      let d = data[i];
      if(d.key === key) {
        data.splice(i,1);
        return;
      }
      if(d.children) {
        deleteItem(d.children, key);
      }
    }
  }

  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item label="名称：" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: '请输入名称' },],
          })(<Input type="text" placeholder="请输入名称" maxLength="30"/>)}
        </Form.Item>
        <Form.Item label="区号：" {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [{ required: true, message: '请输入区号' },],
          })(<Input type="textarea" placeholder="请输入区号" maxLength="100"/>)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>保存</Button>
          <Button onClick={onCancel}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

CForm.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(CForm);
