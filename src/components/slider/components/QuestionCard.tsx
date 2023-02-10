import styled from "styled-components";
import { useState, useEffect, useRef, Fragment } from "react";
import Button from "../../atoms/Button";
import ButtonChoice from "../../atoms/ButtonChoice";

interface QuestionCardProps {
  choices: string[];
  handleChoice: (choice: string[]) => void;
}

const QuestionCard = ({ choices, handleChoice }: QuestionCardProps) => {
  const isInitailRendering = useRef(true);
  const [selectedChoiceList, setSelectedChoiceList] = useState<string[]>([]);

  const onClickChoice = (selectedChoice: string, wasSelected: boolean) => {
    if (wasSelected) {
      setSelectedChoiceList(() =>
        selectedChoiceList.filter((e) => e !== selectedChoice)
      );
    } else {
      setSelectedChoiceList(() => [selectedChoice]);
    }
  };

  useEffect(() => {
    if (isInitailRendering.current) isInitailRendering.current = false;
    else handleChoice(selectedChoiceList);
  }, [selectedChoiceList]);

  const checkSelected = (selectedChoice: string) =>
    selectedChoiceList.some((choice) => choice === selectedChoice);

  return (
    <StyledChoicesContainer>
      <>
        {choices.map((curChoice) => (
          <Fragment key={curChoice}>
            <ButtonChoice
              value={curChoice}
              onClick={() => onClickChoice(curChoice, checkSelected(curChoice))}
              isSelected={checkSelected(curChoice)}
            ></ButtonChoice>
          </Fragment>
        ))}
        {choices.length % 2 === 0 ? null : <ButtonChoice disabled />}
      </>
    </StyledChoicesContainer>
  );
};

const StyledChoicesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export default QuestionCard;
