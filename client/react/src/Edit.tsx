
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from "universal-cookie"
const EditTodo = () => {
    const location = useLocation();
    const { todo } = location.state || {};
    const [title, setTitle] = useState(todo?.title || ''); 
    const [desc, setDesc] = useState(todo?.desc || ''); 
    const [isDone, setIsDone] = useState(todo?.is_done || false);
    const navigate = useNavigate();
    const cookies = new Cookies();
    const jwt = cookies.get('jwt');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedTodo = {
            title,
            desc,
            is_done: isDone,
        };
        console.log(updatedTodo)
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
                navigate('/todo');
            } else {
                console.error('Failed to update todo');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-700">Edit Todo</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title} // Giá trị hiện tại của title
                            onChange={(e) => setTitle(e.target.value)} // Cập nhật state khi người dùng thay đổi input
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Description</label>
                        <textarea
                            name="desc"
                            value={desc} // Giá trị hiện tại của description
                            onChange={(e) => setDesc(e.target.value)} // Cập nhật state khi người dùng thay đổi textarea
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Is Done</label>
                        <input
                            type="checkbox"
                            name="is_done"
                            checked={isDone} 
                            onChange={(e) => setIsDone(e.target.checked)}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit" 
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTodo;
