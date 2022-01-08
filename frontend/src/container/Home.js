import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {  Card, Spin, Button, Empty} from 'antd';
import {getQuiz} from '../store/actions/quiz'
import { Link } from 'react-router-dom';
const QuizList = () => {
    const dispatch = useDispatch();
    const quiz = useSelector(state=> state.quizes.quizGet)
    const loading = useSelector(state=> state.quizes.loading)

    useEffect(()=>{
      dispatch(getQuiz())
    },[dispatch])
    return (
        <div className="container py-5">
        <h1 className="text-center">Quizes</h1>
        <div className="text-right mb-3"><Link to="/create-quiz"><Button type="ghost">Create Quiz</Button></Link></div>
        {loading? (
              <div className="demo-loading-container text-center">
                <Spin />
              </div>)
            :
            quiz.length===0?
            <Empty/>
            :
            quiz.map(item=>{
                return(
                <div key={item.id} className="p-3 float-left">
                <Card title={<Link to={`/quiz/${item.id}`}> {item.title}</Link>}>
                  Time : {item.time} sec<br/>
                  Created Date : {item.created_date}
                </Card>
                </div>
                )
             })  
        }
        </div>        
     );
}
 
export default QuizList;
