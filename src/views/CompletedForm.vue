<template>
    <div class="position-absolute top-50 start-50 translate-middle">
        <div v-if="wrongUrl">
            <h3>
                <!-- In case of wrong :type parameter-->
                Ovaj tip rute ne postoji.
            </h3>
        </div>
        <div v-else>
            <div v-if="formSuccess">
                <h3>
                    <!-- Message if everything went OK with calling BPMN engine-->
                    Forma je uspješno poslana na BPMN server. Pratite mail ili Slack da znate kad dođe red da ispunite sljedeću formu.
                </h3>
            </div>
            <div v-else>
                <h3>
                    <!--Message for problems with BPMN engine-->
                    Trenutno postoje problemi s BPMN serverom. Morat će te kasnije ponovo ispuniti formu.
                </h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"CompletedForm",
    data(){
        return{
            wrongUrl:false,
            formSuccess:false
        }
    },
    created(){
        if (this.$route.params.type === "ok"){
            this.formSuccess = true
        }else if (this.$route.params.type === "error"){
            this.formSuccess = false
        }else{
            this.wrongUrl = true
        }
    }

}
</script>

<style>

</style>