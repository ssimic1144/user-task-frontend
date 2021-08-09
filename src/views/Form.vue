<template>
  <div>
      <FormRenderer class="text-left mt-5" :form-configuration="formData" v-model="formInputData" />
      <!--
      <button class="btn btn-success mt-4" v-on:click="get_data_from_form">Send form</button>
      -->
  </div>
</template>

<script>
import {FormRenderer} from "v-form-builder"
import {v4 as uuidv4} from "uuid"
import controls_helper from '../utils/controls_helper_specification'
import sections_helper from "../utils/section_helper_specification"
import form_config_helper from "../utils/form_config_helper_specification"
import validation_helper from "../utils/validation_helper_specification"

export default {
    name:"Form",
    components:{
        FormRenderer
    },
    data(){
        return{
            formData:null,
            formInputData:null,
            engine_response:null,
            form_description:null
        }
    },
    methods:{
        get_data_from_form(){
            Object.keys(this.engine_response).forEach(engine_key => {
                if(this.engine_response[engine_key].type === "file"){
                    this.formInputData[engine_key] = this.engine_response[engine_key].properties.storage_api_get_location + this.formInputData[engine_key][0]
                }
                if(this.engine_response[engine_key].type === "autocomplete-string"){
                    var real_keys = []
                    this.formInputData[engine_key].forEach(choice =>{
                        var actual_key = choice.split(",")[0]
                        real_keys.push(actual_key)
                    })
                    this.formInputData[engine_key] = real_keys
                }
            })
            console.log(this.formInputData)
            fetch(`http://0.0.0.0:8080/instance/${this.$route.params.instance}/task/${this.$route.params.task}/form`,{
                method:"POST",
                body:JSON.stringify(this.formInputData)
            })
        }
    },
    async created(){
        console.log("created")
        console.log(this.$route.params)
        let get_engine_response = await fetch(`http://0.0.0.0:8080/instance/${this.$route.params.instance}/task/${this.$route.params.task}`,{
            method:"GET"
        }).then(res => {return res.json()}).then(data => {
            console.log(data.documentation)
            this.form_description = data.documentation
            return data.form_fields
        })
        this.engine_response = get_engine_response
        
        console.log(JSON.stringify(get_engine_response))
        console.log(controls_helper)
        
        //Support variables
        var controls_array_for_section = []
        var controls_dict = {}
        
        //Section setup
        var new_section = {}
        var new_section_id = "section-" + uuidv4()
        var new_section_helper = JSON.parse(JSON.stringify(sections_helper))
        new_section_helper.uniqueId = new_section_id
        new_section[new_section_id] = new_section_helper

        //If there is documentation, add it at the begining of the form 
        if (this.form_description !== null){
            var new_documentation = {}
            var new_documentation_id = "control-"+uuidv4()
            var new_documentation_helper = JSON.parse(JSON.stringify(controls_helper["documentation"]))
            new_documentation = new_documentation_helper
            new_documentation.uniqueId = new_documentation_id
            new_documentation.text = this.form_description

            //Putting finished documentation into support variable
            controls_array_for_section.push(new_documentation_id)
            controls_dict[new_documentation_id] = new_documentation
        }

        Object.keys(get_engine_response).forEach(response_key => {
            console.log(get_engine_response[response_key].type)
            Object.keys(controls_helper).forEach(helper_key => {
                if (helper_key === get_engine_response[response_key].type){
                    //Control setup
                    var new_control = {}
                    var new_control_id = "control-"+uuidv4()
                    let new_control_helper = JSON.parse(JSON.stringify(controls_helper[helper_key]));
                    new_control = new_control_helper
                    new_control.uniqueId = new_control_id
                    //Special cases for control
                    if (get_engine_response[response_key].type === "file"){
                        new_control.postActionURL = get_engine_response[response_key].properties.storage_api_post_location
                    }
                    if (get_engine_response[response_key].type === "dropdown"){
                        var options = get_engine_response[response_key].properties.dropdown_options.split(",")
                        console.log(options)
                        options.forEach(option => {
                            var option_dict = {}
                            option_dict.value = option
                            option_dict.text = option
                            new_control.items.push(option_dict)
                        })
                        new_control.placeholderText = "Izaberite...."

                    }
                    if (get_engine_response[response_key].type === "autocomplete-string"){
                        new_control.autocompleteLink = get_engine_response[response_key].properties.autocomplete_api_location
                        new_control.multiple = true
                    }
                    if (get_engine_response[response_key].type === "yes-no-boolean"){
                        new_control.items = []
                        //Currently as strings -> later as bool values
                        var yes_item = {"value":"true", "text":"Da"}
                        var no_item = {"value":"false", "text":"Ne"}
                        new_control.items.push(yes_item)
                        new_control.items.push(no_item)
                    }
                    //Validation setup for control, if needed
                    Object.keys(get_engine_response[response_key].validation).forEach(validation_rule =>{
                        Object.keys(validation_helper).forEach(validation_key => {
                            if(validation_rule === validation_key){
                              
                                var new_validation = JSON.parse(JSON.stringify(validation_helper[validation_key]))
                                if(validation_rule === "max" || validation_rule === "min"){
                                    new_validation.additionalValue = get_engine_response[response_key].validation[validation_rule]
                                }

                                new_control.validations.push(new_validation)
                            }
                        })
                    })

                    new_control.name = response_key
                    new_control.label = get_engine_response[response_key].label
                    
                    //Putting finished control into support variables 
                    controls_array_for_section.push(new_control_id)
                    controls_dict[new_control_id] = new_control
                    
                    console.log(response_key)
                    console.log(JSON.stringify(new_control))

                }
            })
        })
        //Button setup, needed for validations to work and trigerring submit function
        var new_button = {}
        var new_button_id = "control-"+uuidv4()
        var new_button_helper = JSON.parse(JSON.stringify(controls_helper["button"]))
        new_button = new_button_helper
        new_button.uniqueId = new_button_id
        new_button.emitEventCode = "submit_form"
        new_button.emitEventData = this.formInputData
        
        //Putting finished button into support variables
        controls_array_for_section.push(new_button_id)
        controls_dict[new_button_id] = new_button

        //Adding controls array to senction
        new_section[new_section_id].controls = controls_array_for_section

        console.log(controls_array_for_section)
        console.log(controls_dict)
        console.log(JSON.stringify(new_section))

        //Form config setup
        var new_form_config = form_config_helper
        new_form_config.sections = new_section
        new_form_config.controls = controls_dict

        console.log(JSON.stringify(new_form_config))

        //Setting completed form  
        this.formData = new_form_config
        
        //What to do when button is clicked with emitEventCode
        this.$formEvent.$on("submit_form", () => {
            console.log("click")
            this.get_data_from_form()
        })

        console.log(new_button.isRunValidation)

        
    }
}

</script>

<style>
</style>