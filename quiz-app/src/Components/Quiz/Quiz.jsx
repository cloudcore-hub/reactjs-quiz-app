import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

const Quiz = () => {

    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(data[index]);
    let [lock,setLock] = useState(false);
    let [score,setScore] = useState(0);
    let [result,setResult] = useState(false);
    let [userDetails, setUserDetails] = useState({ name: '', email: '' });
    let [startQuiz, setStartQuiz] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1,Option2,Option3,Option4];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userDetails.name && userDetails.email) {
            setStartQuiz(true);
        } else {
            alert("Name and email are required to start the quiz.");
        }
    };

    const checkAns = (e,ans) => {
        if (lock === false){
            if (question.ans===ans){
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);
            }
            else{
                e.target.classList.add("wrong")
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");
            }
        }
    }

    const next = () => {
        if (lock===true) {
            if (index === data.length -1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        setStartQuiz(false);
        setUserDetails({ name: '', email: '' });
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {!startQuiz ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={userDetails.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={userDetails.email} onChange={handleInputChange} required />
                    </div>
                    <button type="submit">Start Quiz</button>
                </form>
            ) : (
                <>
                    {result ? (
                        <>
                            <h2>You Scored {score} out of {data.length}</h2>
                            <button onClick={reset}>Reset</button>
                        </>
                    ) : (
                        <>
                            <h2>{index + 1}. {question.question}</h2>
                            <ul>
                                <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                                <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                                <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                                <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                            </ul>
                            <button onClick={next}>Next</button>
                            <div className="index">{index + 1} of {data.length} questions</div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Quiz;