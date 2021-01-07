# st-admin-vue2.x

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 笔记
```
01.关于语言切换和右边的导航栏的问题：
  右边导航栏： 默认组件中isCollapse拿到vuex中state中的isCollapse的值，点击变化，true/false，
  为了解决用户刷新页面值不会改变，所以我们就当改变isCollapse的值的时候，利用sessionStorage存储，
  存储仓库中，当对isCollapse修改时，对isCollapse新的值进行存储vuex中state中。
  在用的时候isCollapse值就是从mapstate中拿到值。
```
```
02. Computed property "language" was assigned to but it has no setter. ------》bug：
要解决这个问题，首先要明确这个问题出现的原因。这个警告是由于Vue的计算属性内部没有set方法，
即：计算属性不支持值得修改（只能针对data中的值进行计算）。
    如果想修改，那就先拿到数据。然后再重新定义一个变量，这样就可以解决。
```
