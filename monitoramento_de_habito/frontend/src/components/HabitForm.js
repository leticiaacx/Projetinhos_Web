import React, { useState, useEffect } from 'react';

const HabitForm = ({ currentHabit, onCreate, onUpdate }) => {
    const [formData, setFormData] = useState({ name: '', frequency: '' });

    useEffect(() => {
        if (currentHabit) {
            setFormData({ name: currentHabit.name, frequency: currentHabit.frequency });
        } else {
            setFormData({ name: '', frequency: '' });
        }
    }, [currentHabit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentHabit) {
            onUpdate(formData);
        } else {
            onCreate(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Habit Name"
                required
            />
            <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                placeholder="Frequency (Daily, Weekly)"
                required
            />
            <button type="submit">{currentHabit ? 'Update Habit' : 'Add Habit'}</button>
        </form>
    );
};

export default HabitForm;
