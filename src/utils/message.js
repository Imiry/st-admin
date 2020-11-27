/**重置message，防止重复点击重复弹出message弹框 */
import {
  Message
} from 'element-ui';
let messageInstance = null;  

//用户点击是message最初没有为null，当点击弹出来以后，messageInstance这个实例就会有，
//在下次调用messge是就会判断messageInstance是否存在，如果存在就close()关闭，在调用message

const message = (options) => {
  if(messageInstance) {
      messageInstance.close()
  }
  messageInstance = Message(options)
}
;['error','success','info','warning'].forEach(type => {
  message[type] = options => {
      if(typeof options === 'string') {
          options = {
              message:options
          }
      }
      options.type = type
      return message(options)
  }
})
export default  message 
