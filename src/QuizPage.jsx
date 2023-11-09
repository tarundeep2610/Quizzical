import { useEffect, useState } from "react";
import Question from "./Question";
import Loader from './Loader'

export default function QuizPage(props){
    const [questions,setQuestions] = useState([]);
    const [isSubmitted,setIsSubmitted]= useState(false);
    const [resultText,setResultText]= useState('');
    const btnText= !isSubmitted?'Check Answers':'Play Again';
    let selected= questions.filter((question)=> question.selectedOption!=-1).length;
    let resultTextClass= isSubmitted?'green':'red';

    useEffect( () => {
        fetch('https://opentdb.com/api.php?amount=5')
        .then( res => res.json() )
        .then( res =>  setQuestions(res.results.map((data) => {
            let options= data.incorrect_answers;
            let position= Math.floor(Math.random()*(options.length+1));
            if(!options.includes(data.correct_answer)){
                options.splice(position,0,data.correct_answer);
            }
            
            let question= { statement: data.question , options: options, selectedOption: -1, correctOption: position};
            return question;
        })))
    },[props.gameStatus]);

    function handleOptionSelection(quesIdx,optionIdx){
        if(!isSubmitted){
            setQuestions((prevQuestions) => {
                let newQuestions= [...prevQuestions];
                newQuestions[quesIdx].selectedOption= optionIdx;
                return newQuestions;
            })
        }
    }

    function resetAll(){
        setIsSubmitted(false);
        setResultText('');
        setQuestions([]);
    }

    function handleSubmission(){
        if(isSubmitted){
            resetAll();
            props.startQuiz();
        }
        else{
            if(selected===5){
                let correct= questions.filter( (question) => question.selectedOption===question.correctOption).length;
                setResultText( `You scored ${correct} points!!`);
                setIsSubmitted(true);
            }
            else{
                setResultText('Please answer all questions!!')
            }
        }
    }

    const questionElements= questions.map((question,index) => {
        return <Question key={index} index={index} ques={question} handleOptionSelection={handleOptionSelection} status= {isSubmitted}/>
    })

    return (
        <div className="quiz-page">
            {questions.length===0 && <div className="loader"><Loader></Loader></div>}
            <div className="ques-container">
                {questionElements}
            </div>
            <div className="result">
                <div className={`result-text ${resultTextClass}`}>{resultText}</div>
                <div className="check-btn btn"  onClick={handleSubmission}>{btnText}</div>
            </div>
        </div>   
    );
}