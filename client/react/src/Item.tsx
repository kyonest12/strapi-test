import { useNavigate } from 'react-router-dom';
import { Todo } from "./Todo";
import Cookies from "universal-cookie"
interface ItemProps {
    todo: Todo; 
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({ todo, onToggle, onDelete }) => { 
    const navigate = useNavigate();
    const cookies = new Cookies();
    const jwt = cookies.get('jwt');
    const id = todo.id

    const changeState = async () => {
        const updatedTodo = {
            title: todo.title,
            desc: todo.desc,
            is_done: !todo.is_done,
        };
        try {
            const response = await fetch(`http://localhost:1337/api/todos/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({data: {info: updatedTodo}}),
            });
            if (response.ok) {
                onToggle(todo.id)
            } else {
                console.error('Failed to update todo');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };
    
    const deleteTodo = async () => {
        try {
            const response = await fetch(`http://localhost:1337/api/todos/${id}`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
            });    
            onDelete(id);
            } catch (error) {
                console.error(error);
            }
    };

    const editTodo = () => {
        navigate(`/todo/${todo.id}`, {state: {todo}})
    }

    return(
        <div className={`p-4 rounded-md shadow-md ${
            todo.is_done ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{todo.title}</h2>
                <span
                className={`px-2 py-1 text-sm rounded ${
                    todo.is_done ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
                >
                {todo.is_done ? 'Done' : 'Todo'}
                </span>
            </div>
            <p className="text-gray-700">{todo.desc}</p>
            <div className="mt-2 flex space-x-2">
                <button
                    onClick={changeState}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                Change
                </button>
                <button
                    onClick={deleteTodo}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                Delete
                </button>
                <button
                    onClick={editTodo}
                    className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                Edit
                </button>
            </div>
        </div>
    );
};

export default Item;