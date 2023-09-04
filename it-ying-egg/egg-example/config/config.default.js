/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592717717593_8075';

  // add your middleware config here
  config.middleware = [];

  //配置模板引擎
  config.view={
    mapping: {
      '.html': 'ejs',
    },
  };

  //配置api地址
  config.api="http://114.67.89.253:10040/api"


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

