module.exports = class Slider{
    
    constructor()
    {
        this.sliderData = require('../dummy/slider.json')
        this.messages = require('../config/responseMessages.json')
    }

    index(){
        return this.sliderData;
    }

    edit(id){
        return {message: `${this.messages.message.edit.success} for sliderId ${id}` }; 
    }
    store(){
        return {message: this.messages.message.create.success} ; 
    }
}