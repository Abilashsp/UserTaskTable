




function Add(data) {
  // Retrieve the count from localStorage or initialize it to 0 if not found
  let count = parseInt(localStorage.getItem('count')) || 1;
  let id = count;
 
  
  // Increment the count and store it back in localStorage
  count++;
  localStorage.setItem('count', count);

  return {
    type: "ADDLIST",
    data: { ...data, id: id },
    timestamp: new Date().toISOString()
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
    updatedTask: { ...values, id: editId },
    timestamp: new Date().toISOString()
    
  }
};




  
  export default {                                        
    Add,
    Delete,
    Edit,
    toggleCheckbox
  };
  