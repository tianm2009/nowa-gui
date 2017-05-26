import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Switch from 'antd/lib/switch';
import Form from 'antd/lib/form';

import i18n from 'i18n-renderer-nowa';
import { openUrl } from 'util-renderer-nowa';


const FormItem = Form.Item;

class BuildForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState(props.current.abc);
  }

  componentWillReceiveProps({ current }) {
    const { abc, path } = current;
    if (path !== this.props.current.path) {
      const newState = this.getInitState(abc);
      this.setState(newState);
      this.props.form.setFieldsValue({
        ...newState,
      });
    }
  }

  getInitState (abc) {
    const state = {
      dist: typeof abc.dist === 'undefined' ? 'dist' : abc.dist,
      mangle: typeof abc.mangle === 'undefined' ? false : abc.mangle,
      keepconsole: typeof abc.keepconsole === 'undefined' ? false : abc.keepconsole,
      exportcss: typeof abc.exportcss === 'undefined' ? true : abc.exportcss,
      skipminify: typeof abc.skipminify === 'undefined' ? false : abc.skipminify,
    };

    if (!state.skipminify) {
      state.minifyExtension = abc.minifyExtension || '';
    } else {
      state.minifyExtension = '';
    }

    return state;
  }

  handleSubmit = () => {
    const { form, dispatch, current } = this.props;
    form.validateFields((err, data) => {
      if (!err) {
        console.log(data);
        const abc = { ...current.abc, ...data };
        dispatch({
          type: 'project/updateABCJson',
          payload: { project: current, abc }
        });
      }
    });
  }

  changeSkipminify = (skipminify) => {
    this.props.form.setFieldsValue({
      skipminify
    });
    this.setState({ skipminify });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { mangle, keepconsole, exportcss, skipminify, minifyExtension, dist } = this.state;

    return (
      <Form className="setting-form">
        <Tooltip placement="top" title={i18n('foot.help')} >
          <Button type="primary" icon="question" shape="circle" size="small" ghost
            className="project-setting-help"
            onClick={() => openUrl('http://groups.alidemo.cn/alinw-tools/nowa/ben_di_kai_fa.html')}
          />
        </Tooltip>
        <Row className="setting-form-inline">
          <Col span="10" offset="0">
            <FormItem
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              label="Mangle"
            >{getFieldDecorator('mangle', {
              initialValue: mangle,
              valuePropName: 'checked'
            })(<Switch size="default" />)}
            </FormItem>
            <FormItem
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              label="Exportcss"
            >{getFieldDecorator('exportcss', {
              initialValue: exportcss,
              valuePropName: 'checked'
            })(<Switch size="default" />)}
            </FormItem>
            <FormItem
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              label="Dist"
            >{getFieldDecorator('dist', {
              initialValue: dist,
            })(<Input />)}
            </FormItem>
          </Col>
          <Col span="10" offset="2">
            <FormItem
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              label="Keepconsole"
            >{getFieldDecorator('keepconsole', {
              initialValue: keepconsole,
              valuePropName: 'checked'
            })(<Switch size="default" />)}
            </FormItem>
            <FormItem
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              label="Skipminify"
            >{getFieldDecorator('skipminify', {
              initialValue: skipminify,
              valuePropName: 'checked',
              onChange: this.changeSkipminify,
            })(<Switch size="default" />)}
            </FormItem>
            <FormItem
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              label="MinifyExtension"
            >{getFieldDecorator('minifyExtension', {
              initialValue: minifyExtension,
            })(<Input disabled={skipminify} />)}
            </FormItem>
          </Col>
        </Row>
        <FormItem wrapperCol={{ offset: 4 }} className="setting-form-btns">
          <Button
            type="primary"
            size="default"
            style={{ marginLeft: 20 }}
            onClick={this.handleSubmit}
          >{i18n('form.submit')}</Button>
        </FormItem>
      </Form>
    );
  }
}


BuildForm.propTypes = {
  current: PropTypes.shape({
    abc: PropTypes.object,
    path: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default Form.create()(connect(({ project }) => ({
  current: project.current,
}))(BuildForm));