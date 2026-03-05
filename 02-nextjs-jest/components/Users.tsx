'use client'
import { useState, useEffect } from "react";
import { fetchUsers } from "./userService"

interface User {
    id: number;
    name: string;
    username?: string;
    email?: string;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchUsers()
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                        <User key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
}

export function User({user}: {user: User}) {
    return <li>{user.name}</li>
}