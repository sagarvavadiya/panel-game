import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentQuestion, result } from "../redux/slice";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:5040");
const SocketData = () => {
  const [que, setQue] = useState();
  const CurrentQuestion = useSelector((state) => state.counter.currentQuestion);
  const Result = useSelector((state) => state.counter.result);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set up the event listener
    socket.on("getQuestion", (data) => {
      // Handle the received data

      dispatch(currentQuestion(data));
      setQue(data.question);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("getQuestion");
    };
  }, []);

  useEffect(() => {
    // Set up the event listener
    socket.on("AnswerSurvey", (data) => {
      // Handle the received data

      //   dispatch(currentQuestion(data));
      //   setQue(data.question);
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("AnswerSurvey");
    };
  }, []);

  useEffect(() => {
    // Set up the event listener
    socket.on("Result", (data) => {
      // Handle the received data

      dispatch(result(data));
      //   console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("Result");
    };
  }, []);
  return <></>;
};

export const SocketRequest = (url, data) => {
  return new Promise((resolve, reject) => {
    socket.emit(url, data);
  });
};

export default SocketData;
