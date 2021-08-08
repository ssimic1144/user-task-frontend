
var file_uploader = {"uniqueId":"","type":"fileUploader","name":"","label":"File Uploader","subLabel":"","isShowLabel":true,"placeholderText":"","containerClass":"col-md-12 md-layout-item md-size-100","additionalLabelClass":"pt-3","defaultValue":"","defaultValueForAutocomplete":[],"rows":[],"validations":[],"autocompleteLink":"","autocomplete":[],"multiple":false,"postActionURL":"","extensions":".pdf","maxSize":"0","isMultiple":false,"maximumFiles":1,"defaultDropzoneMessage":"&#9729; Drop your files here"}
var input_field = {"uniqueId":"","type":"input","name":"","label":"Input Field","subLabel":"","isShowLabel":true,"placeholderText":"","containerClass":"col-md-12 md-layout-item md-size-100","additionalLabelClass":"pt-3","defaultValue":"","defaultValueForAutocomplete":[],"rows":[],"validations":[],"autocompleteLink":"","autocomplete":[],"multiple":false}
var date_picker_field = {"uniqueId":"","type":"date","name":"","label":"Date Picker","subLabel":"","isShowLabel":true,"placeholderText":"","containerClass":"col-md-12 md-layout-item md-size-100","additionalLabelClass":"pt-3","defaultValue":"","defaultValueForAutocomplete":[],"rows":[],"validations":[],"autocompleteLink":"","autocomplete":[],"multiple":false,"format":"DD/MM/YYYY","firstDay":1,"numberOfMonths":1,"numberOfColumns":1,"minDate":null,"maxDate":null,"singleMode":true,"minDays":0,"maxDays":0,"returnType":"format"}
var dropdown = {"uniqueId":"","type":"dropDown","name":"","label":"Dropdown","subLabel":"","isShowLabel":true,"placeholderText":"","containerClass":"col-md-12 md-layout-item md-size-100","additionalLabelClass":"pt-3","defaultValue":"","defaultValueForAutocomplete":[],"rows":[],"validations":[],"autocompleteLink":"","autocomplete":[],"multiple":false,"dataMode":"list","items":[],"apiURL":"","apiTextKey":"text","apiValueKey":"value"}
var checkbox = {"uniqueId":"","type":"checkbox","name":"","label":"Checkbox List","subLabel":"","isShowLabel":true,"placeholderText":"","containerClass":"col-md-12 md-layout-item md-size-100","additionalLabelClass":"pt-3","defaultValue":"","defaultValueForAutocomplete":[],"rows":[],"validations":[],"autocompleteLink":"","autocomplete":[],"multiple":false,"displayMode":"bothSide","position":"left","items":[{"value":"true","text":""}]}
var text = {"uniqueId":"","type":"text","name":"","label":"Text Field","subLabel":"","isShowLabel":true,"placeholderText":"","containerClass":"col-md-12 md-layout-item md-size-100","additionalLabelClass":"pt-3","defaultValue":"","defaultValueForAutocomplete":[],"rows":4,"validations":[],"autocompleteLink":"","autocomplete":[],"multiple":false}
var button = {"uniqueId":"","type":"button","name":"","label":"Send form","subLabel":"","isShowLabel":false,"placeholderText":"","containerClass":"col-md-12 md-layout-item md-size-100","additionalLabelClass":"pt-3","defaultValue":"","defaultValueForAutocomplete":[],"rows":[],"validations":[],"autocompleteLink":"","autocomplete":[],"multiple":false,"buttonClass":"btn btn-success md-button md-raised md-success md-theme-default","buttonType":"button","postLink":"","emitEventCode":"","emitEventData":"","isRunValidation":true}

var controls_helper = {}
controls_helper["file"] = file_uploader
controls_helper["string"] = input_field
controls_helper["autocomplete-string"] = input_field
controls_helper["date"] = date_picker_field
controls_helper["dropdown"] = dropdown
controls_helper["boolean"] = checkbox
controls_helper["yes-no-boolean"] = checkbox
controls_helper["rich-text"] = text
controls_helper["button"] = button

export default controls_helper
