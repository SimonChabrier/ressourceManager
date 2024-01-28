<template>

  <div id="text-editor" class="text-editor">
    
    <button @click="fetchPosts">Get posts</button>
    <pre>store.re.body : {{ store.re?.body }}</pre>

    <quill-editor ref="quill" :modules="modules" :toolbar="toolbar" v-model:content="content" contentType="html" />
  </div>
</template>

<script setup>
import BlotFormatter from 'quill-blot-formatter'
import store from '@/store'
import { watch, ref, nextTick } from 'vue'

const content = ref('')
const quill = ref(null)
store.re.body = ''

let newContent = '';

watch(content, newValue => {
  newContent = newValue
  store.re.body = newValue
})

watch(
  () => store.re.body,
  newValue => {
    if (newContent === newValue) return

    quill.value.setHTML(newValue)

    // Workaround https://github.com/vueup/vue-quill/issues/52
    // move cursor to end
    nextTick(() => {
      let q = quill.value.getQuill()
      q.setSelection(newValue.length, 0, 'api')
      q.focus()
    })
  }
)

const modules = {
  module: BlotFormatter,
}

const toolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  ['link', 'image', 'video'],
  ['clean'],
]
</script>
