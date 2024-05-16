import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import Category from './components/Category';
import Quiz from './components/Quiz';
import QuizDetails from './components/QuizDetails';
import QuizDetailsUpdate from './components/QuizDetailsUpdate';
function App() {
  return (
    <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Admin />} />
            <Route path="/category" element={<Category />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz-details" element={<QuizDetails />} />
            <Route path="/quiz-details-update/:catId/:quizId" element={<QuizDetailsUpdate />} />

            {/* <Route path="/quizid/:quizToken" element={<QuizId />} />
            <Route path="/makequiz" element={<MakeQuiz />} />
            <Route path="/report/:quizId" element={<Report />} />
            <Route path="/takequiz" element={<TakeQuiz />} />
            <Route path="/login" element={<AdminLogin />} /> */}
            {/* <Route path="/addstudent" element={<AddStudent />} /> */}
            {/* <Route path="/addconfig" element={<AddConfig />} /> */}
            {/* <Route path="/beforestart" element={<BeforeStart />} /> */}
          </Routes>
        </Router>
  );
}

export default App;
