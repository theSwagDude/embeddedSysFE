import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Quiz.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            await axios.get("http://localhost:8085/api/category",)
                .then((res) => {
                    console.log(res.data);
                    setCategories(res.data);
                    fetchQuizzes(res.data[0].id); // Fetch quizzes for the first category initially
                }, fail => {
                    console.error(fail);
                });
        }
        catch (err) {
            alert(err);
        }
    }

    async function fetchQuizzes(id) {
        try {
            await axios.get(`http://localhost:8085/api/quiz/all/${id}`,)
                .then((res) => {
                    console.log(res.data);
                    setQuizzes(res.data)
                }, fail => {
                    console.error(fail);
                });
        }
        catch (err) {
            alert(err);
        }
    }

    const handleCategoryChange = (event) => {
        setSelectedCategoryId(event.target.value);
        fetchQuizzes(event.target.value);
    }

    return (
        <div>
            <div>
                <Sidebar></Sidebar>
            </div>
            <div>
                <select onChange={handleCategoryChange} className='category-select'>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Quiz Title</th>
                            <th>Time Limit</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.map((quiz) => (
                            <tr key={quiz.id}>
                                <td>{quiz.title}</td>
                                <td>{quiz.timeLimit}</td>
                                <td>{quiz.description}</td>
                                <td>{quiz.status === 0 ? 'Inactive' : 'Active'}</td>
                                <td>
                                    <button className="Quiz-button" onClick={() => navigate(`/quiz-details-update/${selectedCategoryId}/${quiz.id}`)}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <button className="Quiz-button" onClick={() => navigate('/quiz-details')}>Add New Quiz</button>
                    </tfoot>
                </table>

            </div>
        </div>
    );
};

export default Quiz;
