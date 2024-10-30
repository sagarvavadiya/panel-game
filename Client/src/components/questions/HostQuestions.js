import React, { useEffect, useState } from "react";
import "./HostQuestions.css";
import Navbar from "../navbar/Navbar";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { SocketRequest } from "../../AllFunction/SocketData";
import { PostApi } from "../../AllFunction/AllFunction";
import { useSelector } from "react-redux";

const QuestionCard = (props) => {
  const [selectAnswer, setSelectAnswer] = useState("");

  let len = `${selectAnswer}`.length;
  console.log(len, selectAnswer);
  return (
    <>
      <div
        className="hq-container-child curserPointer"
        onClick={() => {
          PostApi("saveAttendedQuestions", {
            playerId: props.playerId,
            question: props.question,
            answer: props.answer,
          });

          setSelectAnswer(props.option);
        }}
      >
        <div
          className={
            selectAnswer === props.option
              ? `hq-user-option-img-container-click`
              : `${
                  selectAnswer.length < 0
                    ? `hq-user-option-img-container-click-2`
                    : `hq-user-option-img-container`
                }`
          }
        >
          <h3 className="hq-user-option-number">
            {String.fromCharCode(props.index + 65)}.{props.option}
          </h3>
        </div>
      </div>
    </>
  );
};

const HostQuestion = () => {
  const [showAns, setShowAns] = useState(false);
  const [next, setNext] = useState(1);
  const CurrentQuestion = useSelector((state) => state.counter.currentQuestion);

  const Result = useSelector((state) => state.counter.result);

  const navigate = useNavigate();

  const changeQuestion = () => {
    SocketRequest("getQuestion", {
      index: next,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    SocketRequest("getQuestion", {
      index: 0,
    });
  }, []);

  useEffect(() => {
    SocketRequest("AnswerSurvey");
  }, []);

  useEffect(() => {
    SocketRequest("Result", { QuestionIndex: next });
  }, []);

  const Res = () => {
    SocketRequest("Result", { QuestionIndex: next });
    console.log(Result.QuestionAttendBy);
  };

  return (
    <>
      <div className="hq-user-option-body">
        <div className="navbarComponents">
          <div className="navbarParent">
            <Navbar />
          </div>

          <div className="speedQue">
            {" "}
            <h1 onClick={Res}>Speed Questions</h1>
          </div>
        </div>

        <div className="hq-user-option-main">
          <div className="hq-btn-container">
            <div className="hq-btn">
              <button
                className="hq-buttonShowPoint"
                onClick={() => {
                  setShowAns(true);
                }}
              >{`Show Answer`}</button>
            </div>
            <div className="hq-btn">
              <button
                className="hq-buttonShowPoint"
                onClick={() => {
                  navigate("/leaderBoard");
                }}
              >{`Show Points`}</button>
            </div>
          </div>
          <div className="hq-QuestionBox">
            {" "}
            <div>
              <b>Question {CurrentQuestion.index} : </b>{" "}
              {CurrentQuestion.question}
            </div>
          </div>

          <br />
          <div className="hq-option-container">
            {CurrentQuestion?.options?.map((i, index) => {
              return (
                <div
                  onClick={() =>
                    SocketRequest("Result", { QuestionIndex: next })
                  }
                >
                  <QuestionCard
                    playerId={localStorage.getItem("playerId")}
                    question={CurrentQuestion?.index}
                    option={i}
                    index={index}
                    answer={i === CurrentQuestion?.answer ? true : false}
                  />
                </div>
              );
            })}
          </div>
          <br />

          {showAns ? (
            <div className="hq-QuestionBox">
              {" "}
              <b>Answer:</b> {CurrentQuestion.answer}{" "}
            </div>
          ) : (
            ""
          )}

          {Result
            ? Object.keys(Result?.QuestionAttendBy)?.map((i) => {
                return (
                  <>
                    {" "}
                    <h4>
                      {i}..........{Result.QuestionAttendBy[i]}
                    </h4>
                  </>
                );
              })
            : ""}

          <div className="hq-btn-container2">
            <div className="hq-btn" onClick={changeQuestion}>
              <button
                className="hq-button"
                onClick={() => {
                  setNext(next + 1);
                  SocketRequest("Result", { QuestionIndex: next });
                }}
              >{`Next`}</button>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default HostQuestion;
