/*
  工具设置页面
*/
import React, { PropTypes, Component } from 'react';

import Tabs from 'antd/lib/tabs';

import i18n from 'i18n-renderer-nowa';
import BasicSetting from '../components/Settings/Basic';
import CommandSetting from '../components/Settings/Command';
import PluginSetting from '../components/Settings/Plugin';

const TabPane = Tabs.TabPane;

class SettingPage extends Component {
  render() {
    return (
      <div className="setting">
        <Tabs defaultActiveKey="1" className="setting-tabs">
          <TabPane tab={i18n('setting.basic.title')} key="1">
            <BasicSetting />
          </TabPane>
          <TabPane tab={i18n('setting.cmd.title')} key="2">
            <CommandSetting />
          </TabPane>
          <TabPane tab={i18n('setting.plugin.title')} key="3">
            <PluginSetting />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

SettingPage.propTypes = {};

export default SettingPage;