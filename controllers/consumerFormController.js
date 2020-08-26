module.exports = class ConsumerForm {
   constructor(){
       this.forms = require('../dummy/consumerForms.json')
       this.messages = require('../config/responseMessages.json')
   }

    index(){
      
        return this.forms;
        
    }

    single(id){
        return id;
    }

}

