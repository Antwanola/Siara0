module.exports= {

    isEmpty: function(obj){
        for(let key in obj){
            if(obj.hasOwnProperty(obj[key]
                )){
                return false;
            }
        }

        return true;
    }

}