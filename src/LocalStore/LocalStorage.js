import { createStore } from '@reduxjs/toolkit'
import rootReducer from "../redux/index"
import { v4 as uuidv4 } from 'uuid';




function loadState() {
    try {
      const serialState = localStorage.getItem('TaskListState');
      if (serialState === null) return undefined;
      return JSON.parse(serialState);
    } catch (e) {
      console.warn(e);
    }
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
