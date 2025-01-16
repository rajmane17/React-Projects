import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo } from "../app/features/Todo/todoSlice";

function Todos() {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);

    return (
        <>
            <div className="text-2xl font-bold text-white mb-4">Todos</div>
            <ul className="list-none space-y-4">
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg shadow-md hover:bg-zinc-700 transition-colors"
                        >
                            <div className="text-white text-lg">{todo.content}</div>
                            <button
                                onClick={() => dispatch(deleteTodo(todo.id))}
                                className="text-white bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 text-sm transition-all"
                                aria-label={`Delete ${todo.text}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </li>
                    ))
                ) : (
                    <div className="text-black text-lg">No todos available.</div>
                )}
            </ul>
        </>
    );
}

export default Todos;
