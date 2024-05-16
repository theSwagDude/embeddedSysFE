import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Category.css';

const Category = () => {


    // Replace the initial state of categories with placeholderCategories
    const [categories, setCategories] = useState([]);

    const [editing, setEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const [adding, setAdding] = useState(false);
    const [newCategory, setNewCategory] = useState({ categoryName: '', description: '' });

    const startAdd = () => {
        setAdding(true);
    };

    const saveAdd = async () => {
        setAdding(false);
        await addCategory(newCategory);
        setNewCategory({ categoryName: '', description: '' });
    };

    const startEdit = (category) => {
        setEditing(true);
        setCurrentCategory(category);
    };

    const saveEdit = async (id, category) => {
        setEditing(false);
        setCurrentCategory(null);
        await updateCategory(id, category);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            await axios.get("http://localhost:8085/api/category",)
                .then((res) => {
                    console.log(res.data);
                    setCategories(res.data)
                }, fail => {
                    console.error(fail);
                });
        }
        catch (err) {
            alert(err);
        }
    }

    async function addCategory(category) {
        try {
            await axios.post("http://localhost:8085/api/category", category)
                .then((res) => {
                    console.log(res.data);
                    fetchCategories();
                }, fail => {
                    console.error(fail);
                });
        }
        catch (err) {
            alert(err);
        }
    }

    async function updateCategory(id, category) {
        try {
            if (window.confirm("Are you sure you want to update this category?")) {
                await axios.put(`http://localhost:8085/api/category/${id}`, category)
                    .then((res) => {
                        console.log(res.data);
                        fetchCategories();
                    }, fail => {
                        console.error(fail);
                    });
            }
        }
        catch (err) {
            alert(err);
        }
    }

    async function deleteCategory(id) {
        try {
            if (window.confirm("Are you sure you want to delete this category?")) {
            await axios.delete(`http://localhost:8085/api/category/${id}`)
                .then((res) => {
                    console.log(res.data);
                    fetchCategories();
                }, fail => {
                    console.error(fail);
                });
            }
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <div className="table-container">
            <div>
                <Sidebar></Sidebar>
            </div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>
                                {editing && currentCategory.id === category.id ? (
                                    <input type="text" value={currentCategory.categoryName} onChange={(e) => setCurrentCategory({ ...currentCategory, categoryName: e.target.value })} />
                                ) : (
                                    category.categoryName
                                )}
                            </td>
                            <td>
                                {editing && currentCategory.id === category.id ? (
                                    <input className='input-full-width' type="text" value={currentCategory.description} onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })} />
                                ) : (
                                    category.description
                                )}
                            </td>
                            <td>
                                {editing && currentCategory.id === category.id ? (
                                    <button className='Category-button' onClick={() => saveEdit(category.id, currentCategory)}>Save</button>
                                ) : (
                                    <button className='Category-button' onClick={() => startEdit(category)}>Edit</button>
                                )}
                                <button className='Category-button red' onClick={() => deleteCategory(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {adding && (
                        <tr>
                            <td>
                                <input type="text" className="input-full-width" value={newCategory.categoryName} onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })} />
                            </td>
                            <td>
                                <input type="text" className="input-full-width" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
                            </td>

                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            {adding ? (
                                <button className='Category-button' onClick={saveAdd}>Save New Category</button>
                            ) : (
                                <button className='Category-button green' onClick={startAdd}>Add New Category</button>
                            )}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Category;