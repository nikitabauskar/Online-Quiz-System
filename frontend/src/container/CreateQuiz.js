import React from 'react';
import {Form, Input, TimePicker, InputNumber, Button, Icon, Divider, message} from 'antd'
import { Link, Redirect } from 'react-router-dom';
import FormItem from '../components/FormItem';
import axios from 'axios'
import { endpoint } from '../store/utility';
let uuid = 1;
let uuid1 = 2;
class CreateQuiz extends React.Component {
        state = {
          options: null,
          submit: false,
          title: "",
          time: "",
          date: "",
          marks: 10,
        };
        remove = (k) => {
            const { form } = this.props;
            // can use data-binding to get
            const keys = form.getFieldValue("newkeys");
            if (keys.length === 1) {
              return;
            }
        
            form.setFieldsValue({
              newkeys: keys.filter((key) => key !== k),
            });
          };
        
          add = () => {
            this.setState({ options: null });
            const { form } = this.props;
            const keys = form.getFieldValue("newkeys");
            const nextKeys = keys.concat(uuid);
            uuid++;
            form.setFieldsValue({
              newkeys: nextKeys,
            });
          };
        
          remove1 = (k, l) => {
            const { form } = this.props;
            const keys = form.getFieldValue("choicekey" + k);
            let newkeys = [];
            if (keys) {
              newkeys = keys;
            } else {
              newkeys = [];
            }
            if (newkeys.length === 1) {
              //return;
            }
            form.setFieldsValue({
              ["choicekey" + k]: newkeys.filter((key) => key !== l),
            });
          };
        
          add1 = (index) => {
            const { form } = this.props;
            const keys = form.getFieldValue("choicekey" + index);
            let newkeys = [];
            if (keys) {
              newkeys = keys;
            } else {
              newkeys = [];
            }
            const nextKeys = newkeys.concat(uuid1);
            uuid1++;
            form.setFieldsValue({
              ["choicekey" + index]: nextKeys,
            });
          };
          handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
              if (!err) {
                let time = this.state.time.split(":");
                const secs = parseInt(time[0]) * 60 + parseInt(time[1]);
                const questions = [];
                let answer = [];
                let question = [];
                let questionss = [];
                for (let i = 0; i < values.newkeys.length; i += 1) {
                  answer.push(values.answer[values.newkeys[i]]);
                  question.push(values.question[values.newkeys[i]]);
                  questionss.push(values.questions[values.newkeys[i]]);
                }
                for (let i = 0; i < values.newkeys.length; i += 1) {
                  questions.push({
                    title: question[i].trim(),
                    answer: answer[i],
                    choices: questionss[i].choice.filter((el) => el !== null),
                  });
                }
                const quz = {
                  title: this.state.title.trim(),
                  total_marks: this.state.marks,
                  time: secs,
                  questions,
                };
                axios
                .post(`${endpoint}/create`, quz, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                .then((res) => {
                  message.success("Successfully created quiz")
                  this.setState({submit:true})
              })
                .catch((err)=>{
                  console.log(err.response);
                  message.error("Error in Quiz Submittion")})
                // this.props.createQuiz(quz);
              }
            });
          };
        handleSelect = (k) => {
            this.setState({ options: null });
            var values = this.props.form.getFieldsValue();
            let choices = [];
            if (values.questions !== null && values.questions !== undefined) {
              if (values.questions[k] !== null && values.questions[k] !== undefined) {
                choices = values.questions[k].choice.filter((el) => el !== null);
                this.setState({ options: choices });
              }
            }
          };
        render(){
            var newkeys = [];
            const { marks, options, submit } = this.state
            const { getFieldDecorator, getFieldValue } = this.props.form;
            getFieldDecorator("newkeys", { initialValue: [0] });
            newkeys = getFieldValue("newkeys");
            newkeys.map((i) => {
            return getFieldDecorator("choicekey" + i, { initialValue: [0, 1] });
            });
            const formItemLayout = {
                labelCol: {
                  xs: { span: 12 },
                  sm: { span: 5 },
                },
                wrapperCol: {
                  xs: { span: 24 },
                  sm: { span: 19 },
                },
              };
              if(submit)
              return <Redirect to="/"/>
    return ( 
        <div className="container py-5">
        <Form layout="inline">
            <h1 className="text-center">Quiz Create </h1>
            <div><Link to="/"><Button type="dashed">Back</Button></Link></div>
            <Form.Item
              label="Title"
            >
              <Input
                placeholder="Quiz Title"
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Time">
              <TimePicker
                format={"mm:ss"}
                onChange={(time, timeString) =>
                  this.setState({ time: timeString })
                }
              />
            </Form.Item>
            <Form.Item
              label="Marks"
            >
              <InputNumber
                type="number"
                defaultValue={marks}
                onChange={(v) => this.setState({ marks: v })}
              />
            </Form.Item>
          </Form>
          <Form
            onSubmit={this.handleSubmit}
            layout="vertical"
            {...formItemLayout}
          >
            <Divider />
             
            <FormItem
            isRightAnswerEmpty={this.props.isRightAnswerEmpty}
            getFieldDecorator={getFieldDecorator}
            getFieldValue={getFieldValue}
            newkeys={newkeys}
            options={options}
            remove={this.remove}
            add1={this.add1}
            remove1={this.remove1}
            handleSelect={this.handleSelect}
            />
            
            <Form.Item className="text-center">
              <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                <Icon type="plus" /> Add Question
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.props.loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
     );
}
}
const WrappedCreateQuiz = Form.create()(CreateQuiz);

export default WrappedCreateQuiz;