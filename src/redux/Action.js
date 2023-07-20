let count=0;

function Add(data) {
  let id=count++;
    return {
      type: "ADDLIST",
      data:{...data,id:id}
    };
  }
  
  function Delete(id) {
    return {
      type: "DELETELIST",
      id
      
      
    };
  }

  function toggleCheckbox(id, completed) {
    return {
      type: "CHECKBOX",
      payload: {
        id,
        completed,
      },
    };
  };
  

  


export const Edit = (editId,values) => {
  return {
    type: "EDITLIST",
    updatedTask: { ...values, id: editId }
  }
};




  
  export default {                                        
    Add,
    Delete,
    Edit,
    toggleCheckbox
  };
  