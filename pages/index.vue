<template>
  <header-s/>
</template>

<script>
import HeaderS from '../components/Header'
// let pdfJs = require("pdfjs-dist/build/pdf");
// pdfJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js';

export default {
  name: 'IndexPage',
  data () {
    return {
      socket: null
    }
  },
  components: {
    HeaderS,
  }
}
</script>
