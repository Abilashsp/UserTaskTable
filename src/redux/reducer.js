import action from "./Action";

const initialvalue={
    taskList:[]
}

export default function reducer(state=initialvalue,action){
    

    switch(action.type){

       case "ADDLIST": {
                const updatedTaskList = [...state.taskList, action.data];
                
                return {
                  ...state,
                  taskList: updatedTaskList,
                };
              }
              
        
        case "DELETELIST":
            {
             const newtask= state.taskList.filter((t)=>t.id!==action.id);
                
             return{
                     ...state,taskList:newtask
                }
                
            }
        
    

            case "EDITLIST":
              const updatedTaskListEdit = state.taskList.map((task) => {
                if (task.id === action.updatedTask.id) {
                  return {
                    ...task,
                    name: action.updatedTask.name,
                    TaskName: action.updatedTask.TaskName,
                    TaskDescription: action.updatedTask.TaskDescription,
                  };
                }
                return task;
              });
              return {
                ...state,
                taskList: updatedTaskListEdit,
              };




              case "CHECKBOX": {
            
             
                  const { id, completed } = action.payload;
                  const updatedTaskList = state.taskList.map((task) => {
                    if (task.id === id) {
                      return {
                        ...task,
                        completed: !task.completed,
                      };
                    }
                    return task;
                  });
                  return {
                    ...state,
                    taskList: updatedTaskList,
                  };
                
               
              }
               
               
            
  

        default :{
            return state;
            
        } 
        
    }


}