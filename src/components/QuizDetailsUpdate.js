import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './QuizDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const QuizDetailsUpdate = () => {

    let { catId, quizId } = useParams();

    // const placeholderCat = [
    //     {id: 1, categoryName: 'Math', description: 'Toán học'},
    //     {id: 2, categoryName: 'Chemistry', description: 'Hóa học'}
    //   ];

    const placeholderQuiz = {
        title: '',
        timeLimit: 0,
        description: '',
        status: 0,
        questions: [
            {
                question: '',
                level: 0,
                maxTime: 0,
                point: 0,
                listAnswers: [
                    {
                        answer: '',
                        isCorrect: true
                    },
                    {
                        answer: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    };

    const [quiz, setQuiz] = useState(placeholderQuiz);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuiz();
        fetchCategory();
    }, []);

    // async function fetchCategory() {
    //     try {
    //         await axios.get("http://localhost:8085/api/category",)
    //             .then((res) => {
    //                 console.log(res.data);
    //                 setCategories(res.data);
    //             }, fail => {
    //                 console.error(fail);
    //             });
    //     }
    //     catch (err) {
    //         alert(err);
    //     }
    // }

    async function fetchQuiz() {
        console.log(catId);
        console.log(quizId);
        setCategories(catId);
        try {
            await axios.get(`http://localhost:8085/api/quiz/${quizId}`,)
                .then((res) => {
                    console.log(res.data);
                    setQuiz(res.data);
                }, fail => {
                    console.error(fail);
                });
        }
        catch (err) {
            alert(err);
        }
    }

    async function fetchCategory() {
        console.log(catId);
        console.log(quizId);
        setCategories(catId);
        try {
            await axios.get(`http://localhost:8085/api/category/${catId}`,)
                .then((res) => {
                    console.log(res.data);
                    setCategories(res.data);
                }, fail => {
                    console.error(fail);
                });
        }
        catch (err) {
            alert(err);
        }
    }

    const saveQuiz = async () => {
        await updateQuiz(quiz);
    };

    async function updateQuiz(quiz) {

        try {
            if (window.confirm("Are you sure you want to update this category?")){
            await axios.put(`http://localhost:8085/api/quiz/${quizId}`, quiz)
                .then((res) => {
                    console.log(res.data);
                    alert("Success");
                    navigate('/quiz');
                }, fail => {
                    console.error(fail);
                });
            }
        }
        catch (err) {
            alert(err);
        }
    }

    // const handleCategoryChange = (event) => {
    //     setSelectedCategoryId(event.target.value);
    // }

    return (
        <div>
            <div><Sidebar></Sidebar></div>
            <div className="flex-container">
                <h3>Category: {categories.categoryName}</h3>
            </div>
            <div>

                <div className="main-container">
                    <div className='quiz-data-box'>
                        <h2>Title: <input className='QuizDetails-input' type="text" value={quiz.title} placeholder='Your quiz title' onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} /></h2>
                        <p>Description: <input className='QuizDetails-input' type="text" value={quiz.description} placeholder='A short description' onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} /></p>
                        <div className="field-container">
                            <p>Time Limit: <input className='QuizDetails-input' type="number" value={quiz.timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })} /></p>
                            <p>Status:
                                <select value={quiz.status} onChange={(e) => setQuiz({ ...quiz, status: e.target.value })}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </p>
                        </div>
                        {quiz.questions.map((question, index) => (
                            <div className='question-box' key={index}>
                                <h3>Question {index + 1}: <input className='QuizDetails-input' type="text" placeholder='Question' value={question.question} onChange={(e) => {
                                    let newQuestions = [...quiz.questions];
                                    newQuestions[index].question = e.target.value;
                                    setQuiz({ ...quiz, questions: newQuestions });
                                }} /></h3>
                                <div className="field-container">
                                    <p>Level: <input className='QuizDetails-input' type="number" value={question.level} onChange={(e) => {
                                        let newQuestions = [...quiz.questions];
                                        newQuestions[index].level = e.target.value;
                                        setQuiz({ ...quiz, questions: newQuestions });
                                    }} /></p>
                                    <p>Max Time: <input className='QuizDetails-input' type="number" value={question.maxTime} onChange={(e) => {
                                        let newQuestions = [...quiz.questions];
                                        newQuestions[index].maxTime = e.target.value;
                                        setQuiz({ ...quiz, questions: newQuestions });
                                    }} /></p>
                                    <p>Point: <input className='QuizDetails-input' type="number" value={question.point} onChange={(e) => {
                                        let newQuestions = [...quiz.questions];
                                        newQuestions[index].point = e.target.value;
                                        setQuiz({ ...quiz, questions: newQuestions });
                                    }} /></p>
                                </div>
                                {question.listAnswers.map((answer, answerIndex) => (
                                    <div key={answerIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ margin: '0 10px 0 0' }}>Answer {answerIndex + 1}:</p>
                                        <input className='QuizDetails-input' type="text" placeholder='Tick checkbox to the right if correct' value={answer.answer} onChange={(e) => {
                                            let newQuestions = [...quiz.questions];
                                            newQuestions[index].listAnswers[answerIndex].answer = e.target.value;
                                            setQuiz({ ...quiz, questions: newQuestions });
                                        }} />
                                        <p style={{ margin: '0 10px 0 0' }}></p>
                                        <input type="checkbox" checked={answer.isCorrect} onChange={(e) => {
                                            let newQuestions = [...quiz.questions];
                                            newQuestions[index].listAnswers[answerIndex].isCorrect = e.target.checked;
                                            setQuiz({ ...quiz, questions: newQuestions });
                                        }} />

                                    </div>
                                ))}
                                <button className='QuizDetails-button' onClick={() => {
                                    let newQuestions = [...quiz.questions];
                                    newQuestions[index].listAnswers.push({ answer: '', isCorrect: false });
                                    setQuiz({ ...quiz, questions: newQuestions });
                                }}>Add New Answer</button>

                            </div>
                        ))}
                        <button className='QuizDetails-button yellow' onClick={() => {
                            setQuiz({
                                ...quiz,
                                questions: [...quiz.questions, { question: '', level: '', maxTime: '', point: '', listAnswers: [{ answer: '', isCorrect: true }, { answer: '', isCorrect: false }] }]
                            });
                        }}>Add New Question</button><br /><br></br>
                        <button className='QuizDetails-button green' onClick={saveQuiz}>Save Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizDetailsUpdate;
