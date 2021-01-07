# Vue3.0的学习

Vue.js 3.0 "One Piece" 正式版在今年9月份发布,2年多开发; 100+位贡献者, 2600+次提交, 600+次PR;Vue3支持vue2的大多数特性;更好的支持Typescript

## 一、Composition API

> 文档：https://composition-api.vuejs.org/zh/api.html

### 1) setup

1. 新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次
2. 函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用

```
<template>
  <div>哈哈,我又变帅了</div>
  <h1>{{number}}</h1>
</template>
<script lang="ts">
// defineComponent函数,目的是定义一个组件,内部可以传入一个配置对象
import { defineComponent } from 'vue'
// 暴露出去一个定义好的组件
export default defineComponent({
  // 当前组件的名字是App
  name: 'App',
  // 测试代码 setup是组合API中第一个要使用的函数
  setup(){
    const number =10
    return {
      number
    }
  }
})
</script>
```
### 2) ref

1. 作用: 定义一个数据的响应式
2. 语法: const xxx = ref(initValue):
3. 创建一个包含响应式数据的引用(reference)对象
4. js中操作数据: xxx.value
5. 模板中操作数据: 不需要.value
6. 一般用来定义一个基本类型的响应式数据

```
<template>
  <h2>setup和ref的基本使用</h2>
  <h3>{{ count }}</h3>
  <button @click="updateCount">更新数据</button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  setup(){
    // 变量
    // let count = 0 // 此时的数据并不是响应式的数据(响应式数据:数据变化,页面跟着渲染变化)
    // ref是一个函数,作用:定义一个响应式的数据,返回的是一个Ref对象,对象中有一个value属性,如果需要对数据进行操作,需要使用该Ref对象调用value属性的方式进行数据的操作
    // html模版中是不需要使用.value属性的写法
    // 一般用来定义一个基本类型的响应式数据
    // count 的类型 Ref类型
    const count = ref(0)
    console.log(count)
    // 方法
    function updateCount(){
      console.log('=====')
      // 报错的原因:count是一个Ref对象,对象是不能进行++的操作
      // count++
      count.value++
    }
    // 返回的是一个对象
    return {
      count,
      updateCount
    }
  }
})
</script>
```
### 3) reactive

1. 作用: 定义多个数据的响应式
2. const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
3. 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
4. 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的

```
<template>
  <h2>name: {{state.name}}</h2>
  <h2>age: {{state.age}}</h2>
  <h2>wife: {{state.wife}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script>
/* 
reactive: 
    作用: 定义多个数据的响应式
    const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
    响应式转换是“深层的”：会影响对象内部所有嵌套的属性
    内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
*/
import {
  reactive,
} from 'vue'
export default {
  setup () {
    /* 
    定义响应式数据对象
    */
    const state = reactive({
      name: 'tom',
      age: 25,
      wife: {
        name: 'marry',
        age: 22
      },
    })
    console.log(state, state.wife)

    const update = () => {
      state.name += '--'
      state.age += 1
      state.wife.name += '++'
      state.wife.age += 2
    }

    return {
      state,
      update,
    }
  }
}
</script>
```

### 4) 比较Vue2与Vue3的响应式(重要)

#### vue2的响应式
核心:
1. 对象: 通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)
2. 数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持

```
Object.defineProperty(data, 'count', {
    get () {}, 
    set () {}
})
```
问题:
1. 对象直接新添加的属性或删除已有属性, 界面不会自动更新
2. 直接通过下标替换元素或更新length, 界面不会自动更新 arr[1] = {}

#### Vue3的响应式

核心:
1. 通过Proxy(代理): 拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
2. 通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作
文档:
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

```
<script type="text/javascript">
    // 目标对象
    const user = {
      name: '佐助',
      age: 20,
      wife: {
        name: '小樱',
        age: 19
      }
    }
    // 把目标对象变成代理对象
    // 参数1:user---->target目标对象
    // 参数2:handler---->处理器对象,用来监视数据,及数据的操作
    const proxyUser = new Proxy(user, {
      // 获取目标对象的某个属性值
      get(target, prop) {
        console.log('get方法调用了')
        return Reflect.get(target, prop)
      },
      // 修改目标对象的属性值/为目标对象添加新的属性
      set(target, prop, val) {
        console.log('set方法调用了')
        return Reflect.set(target, prop, val)
      },
      // 删除目标对象上的某个属性
      deleteProperty(target, prop) {
        console.log('delete方法调用了')
        return Reflect.deleteProperty(target,prop)
      }
    })

    // 通过代理对象获取目标对象中的某个属性值
    console.log(proxyUser.name)
    // 通过代理对象更新目标对象上的某个属性值
    proxyUser.name = '鸣人'
    console.log(user)
    // 通过代理对象向目标对象中添加一个新的属性
    proxyUser.gender = '男'
    console.log(user)
    delete proxyUser.name
    console.log(user)
    // 更新目标对象中的某个属性对象中的属性值
    proxyUser.wife.name = '雏田'
    console.log(user)

  </script>
```

###  5)setup细节

setup执行的时机
1. 在beforeCreate之前执行(一次), 此时组件对象还没有创建
2. this是undefined, 不能通过this来访问data/computed/methods / props
3. 其实所有的composition API相关回调函数中也都不可以

setup的返回值
1. 一般都返回一个对象: 为模板提供数据, 也就是模板中可以直接使用此对象中的所有属性/方法
2. 返回对象中的属性会与data函数返回对象的属性合并成为组件对象的属性
3. 返回对象中的方法会与methods中的方法合并成功组件对象的方法
4. 如果有重名, setup优先

注意:
1. 一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
2. setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据

setup的参数
1. setup(props, context) / setup(props, {attrs, slots, emit})
2. props: 包含props配置声明且传入了的所有属性的对象
3. attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
4. slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
5. emit: 用来分发自定义事件的函数, 相当于 this.$emit

父组件:
```
<template>
  <h2>App父级组件</h2>
  <h3>msg:{{ msg }}</h3>
  <button @click="msg += '==='">更新数据</button>
  <hr />
  <Child :msg="msg" msg2="真香" @xxx="xxx" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
// 引入子级组件Child
import Child from './components/Child.vue'
export default defineComponent({
  name: 'App',
  // 注册组件
  components: {
    Child,
  },
  setup() {
    // 定义一个Ref类型的数据
    const msg = ref('what are you no sha lei')
    function xxx(txt: string) {
      msg.value += txt
    }
    return {
      msg,
      xxx,
    }
  },
})
</script>
```
子组件:
```
<template>
  <h2>Child子级组件</h2>
  <h3>msg:{{ msg }}</h3>
  <button @click="emitXxx">分发事件</button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Child',
  props: ['msg'],
  // setup(props,context) {
  setup(props, { attrs, slots, emit }) {
    // props参数,是一个对象,里面有父级组件向子级组件传递的数据,并且是在子级组件中使用props接收到的所有的属性
    // 包含props配置声明且传入了的所有属性的对象
    // console.log(props.msg)
    // console.log(context.attrs)
    // console.log(context.emit)
    // context参数,是一个对象,里面有attrs对象(获取当前组件标签上的所有的属性的对象,但是该属性是在props中没有声明接收的所有的尚需经的对象),emit方法(分发事件的),slots对象(插槽)
    // 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
    // console.log(context.attrs.msg2)
    // console.log('=============')
    console.log('setup执行了', this)

    const showMsg1 = () => {
      console.log('setup中的showMsg1方法')
    }
    // 按钮的点击事件的回调函数
    function emitXxx() {
      // context.emit('xxx','++')
      emit('xxx', '++')
    }
    return {
      showMsg1,
      emitXxx,
      // setup中一般都是返回一个对象,对象中的属性和方法都可以在html模版中直接使用
    }
  },
})
</script>
```

### 6) reactive与ref-细节

1. 是Vue3的 composition API中2个最重要的响应式API
2. ref用来处理基本类型数据, reactive用来处理对象(递归深度响应式)
3. 如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
4. ref内部: 通过给value属性添加getter/setter来实现对数据的劫持
5. reactive内部: 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
6. ref的数据操作: 在js中要.value, 在模板中不需要(内部解析模板时会自动添加.value)

```
<template>
  <h2>App</h2>
  <p>m1: {{m1}}</p>
  <p>m2: {{m2}}</p>
  <p>m3: {{m3}}</p>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import {
  reactive,
  ref
} from 'vue'

export default {

  setup () {
    const m1 = ref('abc')
    const m2 = reactive({x: 1, y: {z: 'abc'}})

    // 使用ref处理对象  ==> 对象会被自动reactive为proxy对象
    const m3 = ref({a1: 2, a2: {a3: 'abc'}})
    console.log(m1, m2, m3)
    console.log(m3.value.a2) // 也是一个proxy对象

    function update() {
      m1.value += '--'
      m2.x += 1
      m2.y.z += '++'

      m3.value = {a1: 3, a2: {a3: 'abc---'}}
      m3.value.a2.a3 += '==' // reactive对对象进行了深度数据劫持
      console.log(m3.value.a2)
    }

    return {
      m1,
      m2,
      m3,
      update
    }
  }
}
</script>
```
### 7) 计算属性与监视

computed函数:
1. 与computed配置功能一致
2. 只有getter
3. 有getter和setter

watch函数
1. 与watch配置功能一致
2. 监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
3. 默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
4. 通过配置deep为true, 来指定深度监视

watchEffect函数
1. 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
2. 默认初始时就会执行第一次, 从而可以收集需要监视的数据
3. 监视数据发生变化时回调

```
<template>
  <h2>App</h2>
  fistName: <input v-model="user.firstName"/><br>
  lastName: <input v-model="user.lastName"/><br>
  fullName1: <input v-model="fullName1"/><br>
  fullName2: <input v-model="fullName2"><br>
  fullName3: <input v-model="fullName3"><br>

</template>

<script lang="ts">
/*
计算属性与监视
1. computed函数: 
  与computed配置功能一致
  只有getter
  有getter和setter
2. watch函数
  与watch配置功能一致
  监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
  默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
  通过配置deep为true, 来指定深度监视
3. watchEffect函数
  不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
  默认初始时就会执行第一次, 从而可以收集需要监视的数据
  监视数据发生变化时回调
*/

import {
  reactive,
  ref,
  computed,
  watch,
  watchEffect
} from 'vue'

export default {

  setup () {
    const user = reactive({
      firstName: 'A',
      lastName: 'B'
    })

    // 只有getter的计算属性
    const fullName1 = computed(() => {
      console.log('fullName1')
      return user.firstName + '-' + user.lastName
    })

    // 有getter与setter的计算属性
    const fullName2 = computed({
      get () {
        console.log('fullName2 get')
        return user.firstName + '-' + user.lastName
      },

      set (value: string) {
        console.log('fullName2 set')
        const names = value.split('-')
        user.firstName = names[0]
        user.lastName = names[1]
      }
    })

    const fullName3 = ref('')

    /* 
    watchEffect: 监视所有回调中使用的数据
    */
    /* 
    watchEffect(() => {
      console.log('watchEffect')
      fullName3.value = user.firstName + '-' + user.lastName
    }) 
    */

    /* 
    使用watch的2个特性:
      深度监视
      初始化立即执行
    */
    watch(user, () => {
      fullName3.value = user.firstName + '-' + user.lastName
    }, {
      immediate: true,  // 是否初始化立即执行一次, 默认是false
      deep: true, // 是否是深度监视, 默认是false
    })

    /* 
    watch一个数据
      默认在数据发生改变时执行回调
    */
    watch(fullName3, (value) => {
      console.log('watch')
      const names = value.split('-')
      user.firstName = names[0]
      user.lastName = names[1]
    })

    /* 
    watch多个数据: 
      使用数组来指定
      如果是ref对象, 直接指定
      如果是reactive对象中的属性,  必须通过函数来指定
    */
    watch([() => user.firstName, () => user.lastName, fullName3], (values) => {
      console.log('监视多个数据', values)
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
}
</script>
```

### 8) 生命周期

#### 与 2.x 版本生命周期相对应的组合式 API
    beforeCreate -> 使用 setup()
    created -> 使用 setup()
    beforeMount -> onBeforeMount
    mounted -> onMounted
    beforeUpdate -> onBeforeUpdate
    updated -> onUpdated
    beforeDestroy -> onBeforeUnmount
    destroyed -> onUnmounted
    errorCaptured -> onErrorCaptured
#### 新增的钩子函数
    组合式 API 还提供了以下调试钩子函数：
    onRenderTracked
    onRenderTriggered
    
### 09) 自定义hook函数

1. 使用Vue3的组合API封装的可复用的功能函数
2. 自定义hook的作用类似于vue2中的mixin技术
3. 自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂
>需求1: 收集用户鼠标点击的页面坐标

hooks/useMousePosition.ts
```
import { ref, onMounted, onUnmounted } from 'vue'
/* 
收集用户鼠标点击的页面坐标
*/
export default function useMousePosition () {
  // 初始化坐标数据
  const x = ref(-1)
  const y = ref(-1)
  // 用于收集点击事件坐标的函数
  const updatePosition = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  // 挂载后绑定点击监听
  onMounted(() => {
    document.addEventListener('click', updatePosition)
  })
  // 卸载前解绑点击监听
  onUnmounted(() => {
    document.removeEventListener('click', updatePosition)
  })

  return {x, y}
}
```
```
<template>
<div>
  <h2>x: {{x}}, y: {{y}}</h2>
</div>
</template>

<script>
import {
  ref
} from "vue"
/* 
在组件中引入并使用自定义hook
自定义hook的作用类似于vue2中的mixin技术
自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂
*/
import useMousePosition from './hooks/useMousePosition'
export default {
  setup() {
    const {x, y} = useMousePosition()
    return {
      x,
      y,
    }
  }
}
</script>
```

>  需求2:  利用TS泛型强化类型检查 . 封装发ajax请求的hook函数
hooks/useRequest.ts

```
import { ref } from 'vue'
import axios from 'axios'

/* 
使用axios发送异步ajax请求
*/
import { ref } from 'vue';
// 引入axios
import axios from 'axios'
// 发送ajax的请求
export default function <T>(url: string) {
  // 加载的状态
  const loading = ref(true)
  // 请求成功的数据
  const data = ref<T | null>(null) // 坑
  // 错误信息
  const errorMsg = ref('')
  // 发送请求
  axios.get(url).then(response => {
    // 改变加载状态
    loading.value = false
    data.value = response.data
  }).catch(error => {
    // 改变加载状态
    loading.value = false
    errorMsg.value = error.message || '未知错误'

  })
  return {
    loading,
    data,
    errorMsg
  }
}
```

```
<template>
<div class="about">
  <h2 v-if="loading">LOADING...</h2>
  <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
  <ul v-else>
    <li>id: {{result.id}}</li>
    <li>name: {{result.name}}</li>
    <li>distance: {{result.distance}}</li>
  </ul> 

  <ul v-for="p in result" :key="p.id">
    <li>id: {{p.id}}</li>
    <li>title: {{p.title}}</li>
    <li>price: {{p.price}}</li>
  </ul>
  <!-- <img v-if="result" :src="result[0].url" alt=""> -->
</div>
</template>

<script lang="ts">
import { watch } from "vue"
import useRequest from './hooks/useRequest'

// 地址数据接口
interface AddressResult {
  id: number;
  name: string;
  distance: string;
}
// 产品数据接口
interface ProductResult {
  id: string;
  title: string;
  price: number;
}
export default {
  setup() {
    // const {loading, result, errorMsg} = useRequest<AddressResult>('/data/address.json')
    const {loading, result, errorMsg} = useRequest<ProductResult[]>('/data/products.json')

    watch(result, () => {
      if (result.value) {
        console.log(result.value.length) // 有提示
      }
    })
    return {
      loading,
      result, 
      errorMsg
    }
  }
}
</script>
```
### 10) toRefs

1. 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
2. 应用: 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用

3. 问题: reactive 对象取出的所有属性值都是非响应式的
4. 解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性

```
<template>
  <h2>toRefs的使用</h2>
  <!-- <h3>name:{{ state.name }}</h3>
  <h3>age:{{ state.age }}</h3> -->

  <h3>name:{{ name }}</h3>
  <h3>age:{{ age }}</h3>

  <h3>name2:{{ name2 }}</h3>
  <h3>age2:{{ age2 }}</h3>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

function useFeatureX() {
  const state = reactive({
    name2: '自来也',
    age2: 47,
  })
  return {
    ...toRefs(state),
  }
}
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: '自来也',
      age: 47,
    })
    // toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
    // const state2 = toRefs(state)
    const { name, age } = toRefs(state)
    // console.log(state2)
    // 定时器,更新数据,(如果数据变化了,界面也会随之变化,肯定是响应式的数据)
    setInterval(() => {
      // state.name += '=='
      // state2.name.value+='==='
      name.value += '==='
      console.log('======')
    }, 1000)

    const { name2, age2 } = useFeatureX()
    return {
      // state,
      // 下面的方式不行啊
      // ...state // 不是响应式的数据了---->{name:'自来也',age:47}
      // ...state2  toRefs返回来的对象
      name,
      age,
      name2,
      age2,
    }
  },
})
</script>
```

### 11) ref获取元素

1. 利用ref函数获取组件中的标签元素

> 功能需求: 让输入框自动获取焦点

```
<template>
  <h2>ref的另一个作用:可以获取页面中的元素</h2>
  <input type="text" ref="inputRef" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'App',

  // 需求:当页面加载完毕后,页面中的文本框可以直接获取焦点(自动获取焦点)

  setup() {
    // 默认是空的,页面加载完毕,说明组件已经存在了,获取文本框元素
    const inputRef = ref<HTMLElement | null>(null)
    // 页面加载后的生命周期组合API
    onMounted(() => {
      inputRef.value && inputRef.value.focus() // 自动获取焦点
    })
    return {
      inputRef,
    }
  },
})
</script>
```