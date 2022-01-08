import React from "react";
import { Steps, Button } from "antd";

const { Step } = Steps;

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { questions } = this.props;
    const { current } = this.state;
    return (
      <div>
        <Steps progressDot current={current}>
          {questions &&
            questions.map((item, index) => (
              <Step key={index} title={index + 1} />
            ))}
        </Steps>
        <div className="steps-content">{questions[current]}</div>
        <div className="steps-action">
          {current < questions.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === questions.length - 1 && (
            <Button type="primary" onClick={this.props.submit}>
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}
export default Questions;
