import { useDispatch, useSelector } from "react-redux";
import Action, { Delete, Edit, toggleCheckbox } from "./redux/Action";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TaskList({ handleEclick }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.TaskDescriptionDetail.taskList);
  // console.log(tasks);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { Delete, toggleCheckbox } = Action;
  const ondelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirmation(true);
  };
  const onDeleteConfirm = () => {
    dispatch(Delete(deleteId));
    setShowDeleteConfirmation(false);
  };
  const onDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleCheckboxChange = (id, completed) => {
    dispatch(toggleCheckbox(id, completed));
  };

  return (
    <div className="py-6  min-h-full">
      <div className="relative overflow-y-auto shadow-md sm:rounded-lg bg-white">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-gray-700 uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-white">
                Mark
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-white ">
                TaskName
              </th>
              <th
                scope="col"
                className="px-6 py-3 task-description-cell task-description-content  text-white"
              >
                TaskDescription
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Edit
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="text-lg overflow-scroll">
            {tasks &&
              tasks.map((task, index) => {
                const isCompleted = task.completed;
                return (
                  <tr
                    key={index}
                    className={`${
                      isCompleted ? "pointer-events-none " : ""
                    } bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-884 overflow-Y-scroll`}
                  >
                    <td
                      className={`px-6 py-4 ${
                        isCompleted ? "decreaseOpacity" : ""
                      }`}
                      id={index}
                    >
                      <input
                        type="checkbox"
                        className={`h-5 w-5 ${
                          isCompleted ? "decreaseOpacity" : ""
                        }`}
                        checked={task.completed}
                        onChange={() =>
                          handleCheckboxChange(task.id, task.completed)
                        }
                      />
                    </td>
                    <td
                      className={`px-6 py-4 first-letter:uppercase ${
                        isCompleted ? "decreaseOpacity" : ""
                      }`}
                      id={index}
                    >
                    {task.id}
                    </td>
                    <td
                      className={`px-6 py-4 first-letter:uppercase ${
                        isCompleted ? "decreaseOpacity" : ""
                      }`}
                      id={index}
                    >
                      {task.name}{" "}
                    </td>
                    <td
                      className={`px-6 py-4 first-letter:uppercase ${
                        isCompleted ? "decreaseOpacity" : ""
                      }`}
                      id={index}
                    >
                      {task.TaskName}
                    </td>
                    <td
                      className={`px-6 py-4 task-description-cell task-description-content first-letter:uppercase height  ${
                        isCompleted ? "decreaseOpacity" : ""
                      }`}
                      id={index}
                    >
                      {task.TaskDescription}
                    </td>
                    <td>
            <div>
              {isCompleted ? (
                <span className="bg-green-500 p-3 mt-3 rounded-xl text-white decreaseOpacity">
                  Completed
                </span>
              ) : (
                <span className="bg-orange-600 p-3 mt-3 rounded-xl text-white ">
                  In progress
                </span>
              )}
            </div>
          </td>
                    <td
                      className={`px-6 py-4 text-white ${
                        isCompleted ? "decreaseOpacity" : ""
                      }`}
                      id={index}
                    >
                      <button
                        className="bg-amber-500 p-3 mt-3 rounded-xl"
                        onClick={() => handleEclick(task.id)}
                      >
                        <FaEdit className="text-2xl" />
                      </button>
                    </td >
                    <td>
                      <div className="px-6 py-4 text-white">
                        <button
                          className="bg-red-600 p-3 mt-3 rounded-xl pointer-events-auto"
                          onClick={() => ondelete(task.id)}
                        >
                          <RiDeleteBin7Fill className="text-2xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>{" "}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Are you sure you want to delete this record?</p>
            <div className="flex justify-end mt-4">
              <button onClick={onDeleteCancel} className="mr-2">
                Cancel
              </button>
              <button onClick={onDeleteConfirm} className="text-red-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
