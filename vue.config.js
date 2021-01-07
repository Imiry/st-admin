/*
 * @Author: sitao
 * @Date: 2021-01-06 17:46:40
 * @LastEditors: sitao
 * @LastEditTime: 2021-01-07 10:38:54
 */
module.exports = {
  // module:{
  //   rules:[
  //   {
  //      test: /.md$/,
  //      use: 'text-loader',        
  //   }
  // ],

  configureWebpack:config=>{
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'vue-loader',
        },
        {
          loader: require.resolve('./src/utils/loader/markdown-loader.js')
        }
      ]
    })
  }
}