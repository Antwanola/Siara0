module.exports={
    select: function(selected, options){
        return options.fn(this).replace(new RegExp(' value=\"'+ selected + '\"'), '$&selected="selected"');
    },
    toggleStatus:()=>{
        var isChecked=document.querySelector('#switch input')
        isChecked.addEventListener('click', ()=>{
          console.log(isChecked.checked)
        })
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