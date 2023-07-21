import { createStore } from '@reduxjs/toolkit'
import rootReducer from "../redux/index"
import { v4 as uuidv4 } from 'uuid';




function loadState() {
    try {
      const serialState = localStorage.getItem('TaskListState');
      if (serialState === null) return undefined;
  
      const parsedState = JSON.parse(serialState);
  
      // If the state doesn't have an id or the id is not a valid uuid, generate a new one
      if (!parsedState || !parsedState.TaskDescriptionDetail || !parsedState.TaskDescriptionDetail.taskList) {
        return { TaskDescriptionDetail: { taskList: [] } };
      }
  
      const tasks = parsedState.TaskDescriptionDetail.taskList.map((task) => {
        if (!task.id || !isValidUUID(task.id)) {
          return { ...task, id: uuidv4() };
        }
        return task;
      });
  
      return { TaskDescriptionDetail: { taskList: tasks } };
    } catch (e) {
      console.warn(e);
    }
  }
  
  function isValidUUID(uuid) {
    // Simple regex check for valid UUID format (e.g., "550e8400-e29b-41d4-a716-446655440000")
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
  }



function saveState(state){

    try{
         const serialState=JSON.stringify(state)
         localStorage.setItem("TaskListState",serialState) 
    }
    catch(e){
        console.warn(e)
    }
}

const store=createStore(rootReducer,loadState())
store.subscribe(() => saveState(store.getState()));



export default store;
