import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'
import play from '../assets/sounds/play.wav'
import correct from '../assets/sounds/correct.wav'
import wait from '../assets/sounds/wait.wav'
import wrong from '../assets/sounds/wrong.wav'
import { questionsData } from '../data/questions'

function Question({questionOrder, setQuestionOrder, setIsGameFinished}) {

  const [question, setQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [classname, setClassname] = useState("answer")


  //sounds
  const [start] = useSound(play)
  const [correctAnswer] = useSound(correct)
  const [waitSound] = useSound(wait)
  const [wrongAnswer] = useSound(wrong)

  useEffect(() => {
    start()
  }, [start])
  
  useEffect(() => {
    setQuestion(questionsData[questionOrder - 1])
  }, [questionsData, questionOrder])

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback()
    }, duration)
  }

  const handleClick = (a) => {
    setSelectedAnswer(a)
    setClassname("answer active")
    delay(3000, () => setClassname(a.correct ? "answer correct" : "answer wrong"))

    delay(5000, () => {
      if(a.correct){
        correctAnswer()
        delay(1000, () => {
          setQuestionOrder(prev => prev + 1)
          setSelectedAnswer(null)
        })
      }
      else{
        wrongAnswer()
        delay(1000, () => {
          setIsGameFinished(true)
        })
      }
    })
  }

  return (
    <div className="question">
      <div className="question-text">{question?.question}</div>
      <div className="answers">
        {question?.answers.map(item => (
          <div key={item.id} className={selectedAnswer === item ? classname : "answer"} onClick={() => handleClick(item)}>{item.text}</div>
        ))}
        
      </div>
    </div>
  )
}

export default Question