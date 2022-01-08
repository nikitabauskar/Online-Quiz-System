import React from "react";
import { Statistic } from "antd";
import { connect } from "react-redux";
const { Countdown } = Statistic;
class Counter extends React.Component {
  render() {
    return (
      <Countdown
        title="Countdown"
        value={Date.now() + this.props.time * 1000 + 1000}
        onFinish={this.props.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quizes.quizDetail,
  };
};

export default connect(mapStateToProps)(Counter);