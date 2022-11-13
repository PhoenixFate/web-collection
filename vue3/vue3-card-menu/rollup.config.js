import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
// 动态引入 https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

export default {
  plugins: [
    dynamicImportVars({
      // options
    })
  ]
};