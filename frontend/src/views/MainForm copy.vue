<script setup>
import MyEditor from '@/components/MyEditor.vue'
import axios from 'axios'
import store from '@/store'

const fetchPosts = () => {
  axios
    .get('//jsonplaceholder.typicode.com/posts')
    .then(res => {
      const post = res.data[0]
      store.re.body = `<h2>${post.title}</h2><p>${post.body}</p>`
    })
    .catch(err => {
      console.warn(err)
    })
}
</script>

<template>
<div>
<div>
  <button @click="fetchPosts">Get posts</button>
  <pre>store.re.body : {{ store.re?.body }}</pre>
</div>
  <div>
  <MyEditor />
</div>
</div>
</template>

<style>

pre {
  white-space: pre-wrap;
}
</style>
