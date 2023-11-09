export default function Question(props){
    
    const options= props.ques.options.map( (data,index) => {
        let optionStatus='';
        if(props.status && props.ques.selectedOption!==-1 && props.ques.correctOption===index){
            optionStatus='correct';
        }
        else if(props.status && props.ques.selectedOption===index){
            optionStatus='wrong';
        }

        return  <div key={index} className={`option ${index===props.ques.selectedOption?'selected':''} ${optionStatus}`}  onClick={() => props.handleOptionSelection(props.index,index)} dangerouslySetInnerHTML={{ __html: data }}></div>
    })
    
    return (
        <div className="question">
            <h4 className="problem" dangerouslySetInnerHTML={{ __html: props.ques.statement }}/>
            <div className="options">
                {options}
            </div>
        </div>
    )
}