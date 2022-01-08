import React from "react";
import { Route } from "react-router-dom";
import Hoc from './hoc/hoc'
import QuizList from "./container/Home";
import QuizDetail from "./container/DetailQuiz"
import CreateQuiz from "./container/CreateQuiz";
const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={QuizList} />
    <Route exact path="/quiz/:quizId" component={QuizDetail} />
    <Route exact path="/create-quiz" component={CreateQuiz} />
  </Hoc>
)
export default BaseRouter;
