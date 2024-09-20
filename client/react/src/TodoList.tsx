import { useEffect, useState, useCallback } from "react";
import { To, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"
import Item from "./Item";
import { Todo } from "./Todo";

const parseStringToBoolean = (str: string): boolean => {
    return str.toLowerCase() === 'true';
  };
  

const TodoList = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [searchTitle, setSearchTitle] = useState(''); 
    const [filterIsDone, setFilterIsDone] = useState(2);
    const jwt = cookies.get('jwt');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    const handleAdd = () => {
        navigate('/add')
    }

    const handleSearch = async () => {
        try {
            
            let url = `http://localhost:1337/api/users/me?populate[todos][populate]=*`;

            const filters = [];
            if (searchTitle) {
                filters.push(`populate[todos][filters][info][title][$containsi]=${encodeURIComponent(searchTitle)}`);
            }
            if (filterIsDone !== 2) {
                var isDone: boolean
                if (filterIsDone == 1) isDone = true
                else isDone = false
                filters.push(`populate[todos][filters][info][is_done][$eq]=${isDone}`);
            }
            if (filters.length > 0) {
                url += '&' + filters.join('&');
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            });
            const data = await response.json();
            const infoArray = data.todos.map((todo: { id: number; info: { title: string; desc: string; is_done: string; }; }) => ({
                id: todo.id,
                title: todo.info.title,
                desc: todo.info.desc,
                is_done: todo.info.is_done
              }));
            setTodos(infoArray)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/users/me?populate[todos][populate]=*', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwt}`,
                    },
                })
                const data = await response.json();
                const infoArray = data.todos.map((todo: { id: number; info: { title: string; desc: string; is_done: string; }; }) => ({
                    id: todo.id,
                    title: todo.info.title,
                    desc: todo.info.desc,
                    is_done: todo.info.is_done
                  }));
                setTodos(infoArray)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);


    const onChangeState = (id: number) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
              todo.id === id ? { ...todo, is_done: !todo.is_done } : todo
            )
          );
    }

    const onDelete = (id: number) => {
        setTodos(prevTodos =>
            prevTodos.filter(todo => todo.id !== id)
          );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader"></div>
            </div>
        );
    }
    else {
        return (
            <div className="max-w-lg mx-auto my-8 p-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold mb-4 p-2 m-4">Todo List</h1>
                    <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                        >
                            Add Todo
                        </button>
                </div>
                <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)} // Cập nhật giá trị searchTitle
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <div className="mb-4">
                    <select
                        value={filterIsDone}
                        onChange={(e) => setFilterIsDone(Number(e.target.value))} // Cập nhật giá trị filterIsDone
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    >
                        <option value={2}>All</option>
                        <option value={0}>Todo</option>
                        <option value={1}>Done</option>
                    </select>
                </div>
                <div className="mb-4">
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                    >
                        Search
                    </button>
                </div>
            </div>
                <ul className="space-y-4">
                {todos.map(todo => (
                    <Item
                        key={todo.id}
                        todo={todo}
                        onToggle={onChangeState}
                        onDelete={onDelete}
                    />
                    ))}
                </ul>
            </div>
        )
    }
};

export default TodoList;