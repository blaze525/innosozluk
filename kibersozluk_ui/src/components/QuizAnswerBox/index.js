import { Grid } from "@mui/material";
import select from "assets/theme/components/form/select";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useMemo, useState } from "react";

const QuizAnswerBox = ({ answers, goToNext, addToRights, quizLang }) => {
  const shuffledAnswers = useMemo(() => {
    return shuffleArray([...answers]);
  }, [answers]);

  const [isSelectedCorrect, setIsSelectedCorrect] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (e, key) => {
    setSelectedIndex(key);

    if ([answers[0].tm, answers[0].ru, answers[0].en].includes(e.target.innerText)) {
      addToRights();
      setIsSelectedCorrect(true);
    } else {
      setIsSelectedCorrect(false);
    }

    setTimeout(() => {
      setIsSelectedCorrect(null);
      setSelectedIndex(null);
      goToNext();
    }, 1000);
  };

  return (
    <Grid item xs={12}>
      {shuffledAnswers.map((answer, index) => {
        return (
          <MKBox display="flex" alignItems="flex-start" p={2} key={index}>
            <MKButton
              color={index === selectedIndex ? (isSelectedCorrect ? "success" : "error") : "info"}
              size="large"
              fullWidth
              sx={{ justifyContent: "flex-start" }}
              onClick={selectedIndex === null ? (e) => handleSelect(e, index) : () => {}}
            >
              {index + 1}
              <MKTypography variant="body2" color="white" p={2} textAlign="left">
                {answer[quizLang]}
              </MKTypography>
            </MKButton>
          </MKBox>
        );
      })}
    </Grid>
  );
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default QuizAnswerBox;
