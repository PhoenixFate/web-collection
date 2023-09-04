'use strict';

// {app_root}/config/plugin.js

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  ejs : {
    enable: true,
    package: 'egg-view-ejs',
  }
};
