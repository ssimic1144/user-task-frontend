<template>
  <div v-if="formData">
      <FormRenderer class="text-left mt-5" :form-configuration="formData" v-model="formInputData" />
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
            //FormRenderer variables
            formData:null,
            formInputData:null,
            //Optional description variable
            form_description:null,
            //Support variables
            engine_response:null,
            controls_array_for_section:[],
            controls_dict:{},
            section_dict:{}
        }
    },
    methods:{
        get_data_from_form(){
            //Make adjustments to data if needed
            Object.keys(this.engine_response).forEach(engine_key => {
                if(this.engine_response[engine_key].type === "file"){
                    //Only file URL location will be sent back to the engine
                    this.formInputData[engine_key] = this.engine_response[engine_key].properties.storage_api_get_location + this.formInputData[engine_key][0]
                }
                if(this.engine_response[engine_key].type === "autocomplete-string"){
                    //Only keys from strings will be sent back to the engine
                    var real_keys = []
                    this.formInputData[engine_key].forEach(choice =>{
                        var actual_key = choice.split(",")[0]
                        real_keys.push(actual_key)
                    })
                    this.formInputData[engine_key] = real_keys
                }
            })
            //Post data to the engine
            fetch(`http://0.0.0.0:8080/instance/${this.$route.params.instance}/task/${this.$route.params.task}/form`,{
                method:"POST",
                body:JSON.stringify(this.formInputData)
            })
        },
        create_control(type, data=null, key=null){
            //Control setup
            var new_control = {}
            var new_control_id = "control-"+uuidv4()
            let new_control_helper = JSON.parse(JSON.stringify(controls_helper[type]));
            new_control = new_control_helper
            new_control.uniqueId = new_control_id
            
            //Special cases for control
            if (type === "file"){
                //Files will be automatically sent to storage_api_post_location after uploading in the form 
                new_control.postActionURL = data.properties.storage_api_post_location
            }
            if (type === "dropdown"){
                var options = data.properties.dropdown_options.split(",")
                options.forEach(option => {
                    var option_dict = {}
                    option_dict.value = option
                    option_dict.text = option
                    new_control.items.push(option_dict)
                })
                new_control.placeholderText = "Choose...."
            }
            if (type === "autocomplete-string"){
                //Data response from autocomplete_api_location must be array of strings.
                //To work properly string in array must be "key,description"
                new_control.autocompleteLink = data.properties.autocomplete_api_location
                new_control.multiple = true
            }
            if (type === "yes-no-boolean"){
                new_control.items = []
                //Currently as strings -> later as bool values
                var yes_item = {"value":"true", "text":"Yes"}
                var no_item = {"value":"false", "text":"No"}
                new_control.items.push(yes_item)
                new_control.items.push(no_item)
            }
            if (type === "documentation"){
                new_control.text = this.form_description
            }
            if (type === "button"){
                new_control.emitEventCode = "submit_form"
                new_control.emitEventData = this.formInputData
            }

            if (data !== null && key!== null){
                //Validation setup for control, if needed
                Object.keys(data.validation).forEach(validation_rule =>{
                    Object.keys(validation_helper).forEach(validation_key => {
                        if(validation_rule === validation_key){
                            var new_validation = JSON.parse(JSON.stringify(validation_helper[validation_key]))
                            if(validation_rule === "max" || validation_rule === "min"){
                                new_validation.additionalValue = data.validation[validation_rule]
                            }
                            new_control.validations.push(new_validation)
                        }
                    })
                })
                //Set name and label 
                new_control.name = key
                new_control.label = data.label
            }
            
            //Add finished control into support variables 
            this.controls_array_for_section.push(new_control_id)
            this.controls_dict[new_control_id] = new_control
            
        },
        create_section(){
            //Section setup
            var new_section = {}
            var new_section_id = "section-" + uuidv4()
            var new_section_helper = JSON.parse(JSON.stringify(sections_helper))
            new_section_helper.uniqueId = new_section_id
            new_section[new_section_id] = new_section_helper

            //Adding controls array to senction
            new_section[new_section_id].controls = this.controls_array_for_section

            //Add section to support variable
            this.section_dict = new_section

        },
        create_complete_form(){
            //Form config setup
            var new_form_config = JSON.parse(JSON.stringify(form_config_helper))
            new_form_config.sections = this.section_dict
            new_form_config.controls = this.controls_dict

            return new_form_config
        }
    },
    async created(){
        //Get User Task information
        let get_engine_response = await fetch(`http://0.0.0.0:8080/instance/${this.$route.params.instance}/task/${this.$route.params.task}`,{
            method:"GET"
        }).then(res => {return res.json()}).then(data => {
            this.form_description = data.documentation
            return data.form_fields
        })

        //Save engine response for later
        this.engine_response = get_engine_response
       
        //If there is documentation, add it at the begining of the form 
        if (this.form_description !== null){
            this.create_control("documentation")
        }

        //Loop throu all form fields and create controls
        Object.keys(get_engine_response).forEach(response_key => {
            Object.keys(controls_helper).forEach(helper_key => {
                if (helper_key === get_engine_response[response_key].type){
                    this.create_control(helper_key,get_engine_response[response_key],response_key)
                }
            })
        })
        
        //Add button at the end of the form
        this.create_control("button")
        
        //Create section
        this.create_section() 

        //Set complete form  
        this.formData = this.create_complete_form()

        //What to do when button is clicked with emitEventCode
        this.$formEvent.$on("submit_form", () => {
            console.log("click")
            this.get_data_from_form()
        })

    }
}

</script>

<style>
</style>