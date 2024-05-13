'use client';
import React, {useState} from 'react';
import Card from "@/components/Card";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import {DragDropContext, Draggable, Droppable, DropResult} from '@hello-pangea/dnd';

function Home() {

    type TodoType = {
        id: number;
        taskName: string;
        isComplete: boolean,
        createdAt: string
    };

    const initialTodo: TodoType = {
        id: 0,
        taskName: "",
        isComplete: false,
        createdAt: "",
    };

    const [taskName, setTaskName] = useState("");
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTodo, setEditingTodo] = useState<TodoType>(initialTodo);

    /**
     * Handler to Add new todo
     * @param e
     */
    const handleAddTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (taskName) {

            const newTodo: TodoType = {
                id: todos.length + 1,
                taskName: taskName,
                isComplete: false,
                createdAt: (new Date()).toLocaleString()
            };

            setTodos(prevState => ([
                newTodo,
                ...prevState,
            ]));
            setTaskName("");
        } else {
            alert("Please enter task name to create...")
        }
    }

    /**
     * Handler to set selected todo in modal
     * @param id
     */
    const handleEditTodo = (id: number) => {
        let todo = todos.find(todo => todo.id == id);
        if (todo) {
            setEditingTodo(todo);
            setIsEditing(true);
        }
    }

    /**
     * Handler to update todo
     */
    const handleUpdateTodo = () => {
        const todoIndex = todos.findIndex(todo => todo.id == editingTodo.id);
        if (todoIndex > -1) {
            const newTodos = todos.map((todo, index) => {
                if (index === todoIndex) {
                    return editingTodo
                } else {
                    return todo
                }
            });
            setTodos(newTodos);
            setIsEditing(false);
        }
    }

    /**
     * Handler to update status of editing todo
     * @param e
     */
    const handleStatusUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTodo(prevState => ({
            ...prevState,
            isComplete: e.target.value === "complete",
        }))
    }

    /**
     * Handler to delete selected todo
     * @param id
     */
    const handleDeleteTodo = (id: number) => {
        if (window.confirm("Are you sure to delete this todo?")) {
            setTodos(todos.filter(todo => todo.id != id));
        }
    }

    // Handler function for when items are reordered
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return; // dropped outside the list
        if (result.destination.index === result.source.index) {return;} // dropped on same location

        // reorder items
        const newTodos = Array.from(todos);
        const [movedTodo] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, movedTodo);
        setTodos(newTodos);
    };

    return (
        <main className={"p-4 md:p-8 flex justify-center"}>
            {isEditing &&
                <div className={"fixed top-0 left-0 w-full min-h-screen bg-black bg-opacity-70 flex justify-center items-center"}>
                <Card className={"lg:w-1/4 p-3 bg-white"}>
                    <div className={"my-3"}>
                        <h2 className={"text-2xl text-center mb-3"}>Update Todo</h2>
                        <Input placeholder={"Task Name..."}
                               value={editingTodo.taskName}
                               className={"flex-auto w-full mb-3"}
                               onChange={(e) => {
                                   setEditingTodo(prevState => ({
                                       ...prevState,
                                       taskName: e.target.value
                                   }));
                               }}
                        />

                        <div className={"my-2"}>
                            <label htmlFor={"isComplete"} className={"me-2"}>Status</label>
                            <input type={"radio"}
                                   name={"isComplete"}
                                   value={"complete"}
                                   id={"complete"}
                                   checked={editingTodo.isComplete}
                                   onChange={handleStatusUpdate}
                            />
                            <label htmlFor={"complete"} className={"text-green-600 ms-1 me-3"}>Complete</label>

                            <input type={"radio"}
                                   name={"isComplete"}
                                   value={"incomplete"}
                                   id={"incomplete"}
                                   checked={!editingTodo.isComplete}
                                   onChange={handleStatusUpdate}
                            />
                            <label htmlFor={"incomplete"} className={"text-red-600 ms-1"}>Incomplete</label>
                        </div>

                        <PrimaryButton className={"mt-3"} onClick={handleUpdateTodo}>Update</PrimaryButton>
                        <SecondaryButton className={"mt-3 ms-3"} onClick={() => {
                            setIsEditing(false)
                        }}>Cancel</SecondaryButton>
                    </div>
                </Card>
            </div>}

            <Card className={"lg:w-1/3 md:w-2/3 w-full p-4 md:p-8"}>
                <h2 className={"text-2xl text-center"}>My Todo List</h2>
                <div className={"flex flex-wrap items-center mt-3"}>
                    <Input placeholder={"Task Name..."}
                           value={taskName}
                           className={"flex-auto max-w-full mb-3"}
                           onChange={(e) => {
                               setTaskName(e.target.value)
                           }}
                    />
                    <PrimaryButton className={"flex-1 ms-0 md:ms-3 mb-3 min-w-32"} onClick={handleAddTodo}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6 inline-block me-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        Add New
                    </PrimaryButton>
                </div>

                <div className={"border-b border-gray-300 mb-3"}></div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                    {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {todos.map((todo, index) => (
                                    <Draggable key={index}  draggableId={"draggable-" + index} index={index}>
                                        {provided => (
                                            <Card innerRef={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  className={"p-3 md:p-4 mb-2 bg-white"}
                                            >
                                                <div className={"flex justify-between"}>
                                                    <p className={"text-base md:text-lg flex-auto"}>{todo.taskName}</p>
                                                    <div className={"inline-flex flex-wrap justify-end ms-3 w-10"}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                             fill="currentColor"
                                                             onClick={() => {
                                                                 handleEditTodo(todo.id)
                                                             }}
                                                             className="w-5 h-5 text-blue-600 hover:text-blue-500 mb-2 cursor-pointer">
                                                            <path
                                                                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"/>
                                                            <path
                                                                d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"/>
                                                        </svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                             fill="currentColor"
                                                             onClick={() => handleDeleteTodo(todo.id)}
                                                             className="w-5 h-5 ms-1 md:ms-2 text-red-600 hover:text-red-500 cursor-pointer">
                                                            <path fillRule="evenodd"
                                                                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className={"flex flex-wrap-reverse justify-end md:justify-between items-center mt-2"}>
                                                    <small className={"text-gray-400"}>{todo.createdAt}</small>
                                                    <div className={"ms-3"}>
                                                        <span className={"text-sm " + (todo.isComplete ? 'text-green-600' : 'text-red-600')}>
                                                            {todo.isComplete ? 'Complete' : 'Incomplete'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Card>
        </main>
    );
}

export default Home;