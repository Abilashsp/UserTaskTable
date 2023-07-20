import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import TaskList from "./TaskList";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import Action from "./redux/Action";

export default function Homepage() {
  // const{setFieldValue}=useFormik
  const tasks = useSelector((state) => state.taskList);

  const { Add, Edit } = Action;
  const [editbar, setEditbar] = useState(false);
  const [editId, setEditId] = useState(null);

  const [model, setmodel] = useState(false);

  const openmodel = () => {
    setmodel(true);
  };
  const closemodel = () => {
    setmodel(false);
  };

  const [selectlist, setselectList] = useState(null);
  const Dispatch = useDispatch();

  const handleEclick = (id) => {
    setEditbar(true);
    setEditId(id);
    const _selectlist = tasks.find((t) => t.id == id);
    setselectList(_selectlist);
    openmodel();
  };

 

  const validation = yup.object().shape({
    name: yup.string().required("User Name is required").matches(/^[^0-9].*$/, "First character should be alphabet"),
    TaskName: yup.string().required("Task Name is required").matches(/^[^0-9].*$/, "First character should be alphabet"),
    TaskDescription: yup.string().required("Task Description is required").min(20,"minimum 20 letters required").matches(/^[^0-9].*$/, "First character should be alphabet"),
  });

  return (
    <div>
      <div className="text-center mt-8 ">
        {" "}
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">TaskDescription Details</span></h1>
      </div>
<div className="h-full">
      <div className=" flex justify-end p-7 ">
        <button
          type="button"
          onClick={openmodel}
          className="rounded-md bg-black  px-4 py-2 text-2xl font-medium bg-blue-900 text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add
        </button>
      </div>
      <Transition appear show={model} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closemodel}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Formik
                    enableReinitialize
                    validationSchema={validation}
                    initialValues={
                      editbar
                        ? selectlist
                        : {
                            completed: false,
                            name: "",
                            TaskName: "",
                            TaskDescription: "",
                          }
                    }
                    

                    onSubmit={(values, { resetForm }) => {
                      if (editbar) {
                        Dispatch(Edit(editId, values));
                      } else {
                        Dispatch(Add(values));
                      }

                      setEditId(null);
                      resetForm();
                      setEditbar(false);
                      closemodel();
                    }}
                  >
                    <Form className="flex justify-center items-center flex-col">
                      <div>
                      <label
                        htmlFor="UserName"
                        className=" rounded-lg text-xl mb-2"
                      >
                        User Name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        placeholder="UserName "
                        className="bottom-2  p-2 w-4/5 rounded-lg text-xl border-4 border-solid text-slate-800"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500"
                      />
                        </div>     
                        <div>
                      <label
                        htmlFor="TaskName"
                        className="bottom-2   rounded-lg text-xl mb-2"
                      >
                        Task Name
                      </label>
                      <Field
                        id="TaskName"
                        name="TaskName"
                        placeholder="TaskName"
                        className="bottom-2 p-2 w-4/5 rounded-lg text-xl border-4 border-solid text-slate-800"
                      />
                      <ErrorMessage
                        name="TaskName"
                        component="div"
                        className="text-red-500"
                      />
                      </div>  
                      <div>
                      <label
                        htmlFor="TaskDescription"
                        className="bottom-2 ml-7 rounded-lg text-xl mb-2"
                      >
                        Task Description
                      </label>

                      <Field
                        as="textarea"
                        id="TaskDescription"
                        name="TaskDescription"
                        placeholder="TaskDescription"
                        className="bottom-2 p-2 py-4 w-4/5 rounded-lg ml-7 text-xl border-4 border-solid text-slate-800"
                      />
                      <ErrorMessage
                        name="TaskDescription"
                        component="div"
                        className="text-red-500 ml-7"
                      />
                      </div>
                      <button
                        type="submit"
                        className="rounded-md bg-black  px-4 py-2 mt-3 text-2xl font-medium bg-blue-900 text-white hover:bg-opacity-30  "
                      >
                        {editbar ? <span>Save</span> : <span>submit</span>}
                      </button>
                    </Form>
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <TaskList handleEclick={handleEclick} />
    </div>
    </div>
  );
}
