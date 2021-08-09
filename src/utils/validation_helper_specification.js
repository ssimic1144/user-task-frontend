var max_rule = {"ruleType":"max","errorMessage":"Maximum value for this field is :max","additionalValue":""}
var required_field = {"ruleType":"required","errorMessage":"This field is required","additionalValue":""}
var min_rule = {"ruleType":"min","errorMessage":"Minimum value for this field is :min","additionalValue":""}
var email_rule = {"ruleType":"isEmail","errorMessage":"Wrong email address format","additionalValue":""}

var validation_helper = {}
validation_helper["max"] = max_rule
validation_helper["required"] = required_field
validation_helper["min"] = min_rule
validation_helper["email"] = email_rule

export default validation_helper