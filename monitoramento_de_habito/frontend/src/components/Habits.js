import React, { useEffect, useState, useContext } from 'react';
import { getHabits, createHabit, updateHabit, deleteHabit } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import HabitForm from './HabitForm';

const Habits = () => {
    const { user } = useContext(AuthContext);
    const [habits, setHabits] = useState([]);
    const [currentHabit, setCurrentHabit] = useState(null);

    useEffect(() => {
        const fetchHabits = async () => {
            const response = await getHabits(user);
            setHabits(response.data);
        };
        fetchHabits();
    }, [user]);

    const handleCreate = async (habit) => {
        const response = await createHabit(habit, user);
        setHabits([...habits, response.data]);
    };

    const handleUpdate = async (habit) => {
        const response = await updateHabit(currentHabit._id, habit, user);
        setHabits(habits.map((h) => (h._id === currentHabit._id ? response.data : h)));
        setCurrentHabit(null);
    };

    const handleDelete = async (id) => {
        await deleteHabit(id, user);
        setHabits(habits.filter((h) => h._id !== id));
    };

    return (
        <div>
            <h2>Habits</h2>
            <HabitForm
                currentHabit={currentHabit}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
            />
            <ul>
                {habits.map((habit) => (
                    <li key={habit._id}>
                        {habit.name} - {habit.frequency}
                        <button onClick={() => setCurrentHabit(habit)}>Edit</button>
                        <button onClick={() => handleDelete(habit._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Habits;
