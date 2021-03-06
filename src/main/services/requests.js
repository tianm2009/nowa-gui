/*
  基础任务-包含打点和反馈请求
  可以合并到initialize去
*/
import { hostname } from 'os';
import MacAddress from 'get-mac-address';
import { FEEDBACK_URL, request } from 'shared-nowa';

import { APP_VERSION } from './paths';
import log from './applog';

const logServer = 'https://retcode.taobao.com/r.png';
const host = hostname();

const feedback = async function ({ nickname, contact, content }) {
  const res = await request(FEEDBACK_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      msgtype: 'markdown',
      markdown: {
        title: '来自用户的反馈',
        text: '### Name\n' +
              `${nickname}\n` +
              '### Contact\n' +
              `${contact}\n` +
              '### Feedback\n' +
              `${content}\n` +
              '### Version\n' +
              `${APP_VERSION}\n` +
              '### OS\n' +
              `${process.platform}\n`
      }
    })
  });
  return res;
};

// 获取本机mac地址
const macAddr = Object.values(MacAddress).filter(n => n.indexOf('00:00:00:00') === -1);


const getPointArgs = () => {
  const params = {
    host,
    spm: 'nowa-gui',
    mac: macAddr[0],
    version: APP_VERSION,
    os: process.platform,
  };
  return Object
    .keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
};

const sendPointLog = () => {
  const queryStr = getPointArgs();
  request(`${logServer}?${queryStr}`);
};


export default {
  feedback,
  sendPointLog
};
