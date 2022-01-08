import React from "react";
import { Radio } from "antd";

const Choices = (props) => {
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  const { choices, questionId, userAnswer, change } = props;

  return (
    <Radio.Group
      onChange={(e) => change(e, undefined, questionId)}
      value={userAnswer[questionId] ? userAnswer[questionId] : null}
    >
      {choices.map((c, key) => {
        return (
          <Radio key={key} style={radioStyle} value={c}>
            {c}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};

export default Choices;
