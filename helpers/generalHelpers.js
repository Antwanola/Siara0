module.exports={
    select: function(selected, options){
        return options.fn(this).replace(new RegExp(' value=\"'+ selected + '\"'), '$&selected="selected"');
    }

    // checkPoccurence: (pOccurence)=>{
    //     if(pOccurence == yes){
    //         return true
    //     }
    //     else{
    //         return false
    //     }
    // }
}