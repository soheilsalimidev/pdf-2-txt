<template>
  <div>
    <header-s/>
  </div>
</template>

<script>
import HeaderS from '../components/Header'

export default {
  name: 'IndexPage',
  components: {
    HeaderS
  },
  data () {
    return {
      socket: null
    }
  }
}
</script>
