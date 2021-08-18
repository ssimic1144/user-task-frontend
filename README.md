# user-task-frontend

The main purpose of this web application is to provide interface for BPMN **User Tasks** executed on [Python BPMN Engine](https://github.com/ssimic1144/python-bpmn-engine). 

At the current stage this application starts the process on the engine and it assumes that **User Task** follows the **Start Event**. This can be easily modified so that it fits your BPMN model.

Core of this application is `Form.vue` which creates form based on specifications in **User Task**, supported fields can be seen [here](https://github.com/ssimic1144/python-bpmn-engine). Custom form field types are also supported, some of which you can find in `Form.vue`, but if you need more of them, to fulfil your business goals, you will need to extend current *Special cases for controls*.

---

> You will need to change URL from 0.0.0.0 to the real one once you deploy the engine and this applications 

---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
