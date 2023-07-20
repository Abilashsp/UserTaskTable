import React from "react";
import { useState } from "react";

export default function TableData(props) {
 
  
  return (
    <div className=" h-screen   ">
      {/* <form onSubmit={props.onFormSubmit}>
        <table>
          <thead className=" ">
            <div className="py-10 px-4 w-full">
              <tr className=" border-2  bg-orange-700  ">
                <td className="px-10 py-5">Name</td>
                <td className="px-10 py-5">TaskName</td>
                <td className="px-10 py-5">TaskDescription</td>
                <td className="px-10 py-5">Status</td>
                <td className="px-10 py-5">Edit</td>
                <td className="px-10 py-5">Delete</td>
              </tr>
            </div>
          </thead>
          <tbody>
            <div className=" px-4 w-full">
              
                {props.formData.map((data,index) => {
                  return(
                  <tr>
                    <td className="px-10 py-5" name={data} id={index}></td>
                    <td className="px-10 py-5"name={data} id={index}></td>
                    <td className="px-10 py-5"name={data} id={index}></td>
                  </tr>
                )
                })}
              
            </div>
          </tbody>
        </table>
      </form> */}
    </div>
  );
}
