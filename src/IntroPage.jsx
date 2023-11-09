import './style.css';

export default function IntroPage({startQuiz}){
    return <div id='intro-page'>
        <div className="intro-page-title">Quizzical</div>
        <div className="description">Test your brain with this amazing trivia</div>
        <div className="start-btn btn" onClick={startQuiz}>Start Quiz</div>
    </div>
}