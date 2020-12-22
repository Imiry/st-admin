/*
 * @Author: sitao
 * @Date: 2020-12-22 18:03:01
 * @LastEditors: sitao
 * @LastEditTime: 2020-12-22 18:03:02
 */
import Vue from 'vue'
 
Vue.directive('drag',{
    bind:function (el) {
        //监听document是因为如果监听元素el的话鼠标太快移出元素后就会失效
        el.onmousedown = (event) => {
            //算出鼠标相对元素的位置
            let pointX = event.clientX - el.offsetLeft;//鼠标位置X减去元素距离左边距离（鼠标到元素左边的距离）
            let pointY = event.clientY - el.offsetTop;//鼠标位置Y减去距离顶部距离（鼠标到元素顶部的高度）
 
            document.onmousemove = (e)=>{
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - pointX;
                let top = e.clientY - pointY;
 
                //移动当前元素
                el.style.left = left + 'px';
                el.style.top = top + 'px';
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
})