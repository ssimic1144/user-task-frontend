<template>
  <div class="home">
    <div class="position-absolute top-50 start-50 translate-middle">
      <button class="btn btn-primary" v-on:click="start_bpmn_proces">Start process</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      instance:"",
      task:""
    }
  },
  methods:{
    start_bpmn_proces(){
      fetch("http://0.0.0.0:8080/instance",{
        method:"POST"
      }).then(response => {
        return response.json()
      }).then(data => {
        this.instance = data.id
        fetch(`http://0.0.0.0:8080/instance/${this.instance}`,{
            method:"GET"
          }).then(response => {
            return response.json()
          }).then(data => {
            this.task = data.pending[0]
            this.$router.push(`/form/${this.instance}/${this.task}`)
          })
      })
      }
  }
}
</script>
