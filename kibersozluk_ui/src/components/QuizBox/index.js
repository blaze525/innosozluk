import { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import QuizCounter from "components/QuizCounter";
import QuizAnswerBox from "components/QuizAnswerBox";
import TestEnded from "components/TestEnded";

function QuizBox({ lang }) {
  const quiz_lang = lang.lang || "tm";
  const [rightsCounter, setRightsCounter] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get("http://10.10.73.17:3100/api/quiz");
      const data = response.data;
      setQuestions(data);
      localStorage.setItem("questions", JSON.stringify(questions));
    } catch (error) {
      console.error("Soraglary almakda ýalňyşlyk ýüze çykdy:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("questions")) {
      fetchQuizData();
    } else {
      setQuestions(JSON.parse(localStorage.getItem("questions")));
      setCurrentQuestion(parseInt(localStorage.getItem("currentQuestion")));
      setRightsCounter(parseInt(localStorage.getItem("rightsCounter")));
    }
  }, []);

  const restartQuiz = () => {
    localStorage.removeItem("questions");
    setCurrentQuestion(1);
    setRightsCounter(0);
    fetchQuizData();
  };

  const goToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const addToRights = () => {
    setRightsCounter(rightsCounter + 1);
  };

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("rightsCounter", rightsCounter);
  }, [questions, currentQuestion, rightsCounter]);

  return currentQuestion < 11 ? (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container justifyContent="center">
          <QuizCounter dogry={rightsCounter} jemi={10} hazirki={currentQuestion} />
          <Grid item xs={12}>
            <MKTypography variant="body2" color="text">
              ADALGA
            </MKTypography>
            {questions.length > 0 && (
              <>
                <MKTypography variant="h3" mb={1}>
                  {questions[currentQuestion - 1].term[quiz_lang]}
                </MKTypography>
                <MKTypography
                  component="a"
                  variant="body2"
                  color="info"
                  fontWeight="regular"
                  sx={{
                    width: "max-content",
                    display: "flex",
                    alignItems: "center",
                    "& .material-icons-round": {
                      fontSize: "1.125rem",
                      transform: "translateX(3px)",
                      transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                    },
                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: "translateX(6px)",
                    },
                  }}
                >
                  Jogaby saýlaň:
                </MKTypography>
              </>
            )}
          </Grid>
          {questions.length > 0 && (
            <QuizAnswerBox
              answers={questions[currentQuestion - 1].answers}
              goToNext={goToNextQuestion}
              addToRights={addToRights}
              quizLang={quiz_lang}
            />
          )}
        </Grid>
      </Container>
    </MKBox>
  ) : (
    <TestEnded restartQuiz={restartQuiz} rights={rightsCounter} total={10} />
  );
}

export default QuizBox;
