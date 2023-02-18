import styled from "styled-components";
import { useState, useEffect, useRef, Fragment } from "react";
import ButtonChoice from "./ButtonChoice";

export type QuestionCardProps = {
  choices: string[];
  handleChoice: (choice: string) => void;
};

export default function QuestionCards({
  choices,
  handleChoice,
}: QuestionCardProps) {
  const isInitailRendering = useRef(true);
  const [selectedChoice, setSelectedChoice] = useState<string>("");

  const checkSelected = (choice: string) => selectedChoice === choice;

  const onClickChoice = (selectedChoice: string) => {
    if (checkSelected(selectedChoice)) {
      setSelectedChoice("");
    } else {
      setSelectedChoice(selectedChoice);
    }
  };

  useEffect(() => {
    if (isInitailRendering.current) isInitailRendering.current = false;
    else handleChoice(selectedChoice);
  }, [selectedChoice]);

  return (
    <StyledChoicesContainer>
      <>
        {choices.map((curChoice) => (
          <Fragment key={curChoice}>
            <ButtonChoice
              value={curChoice}
              onClick={() => onClickChoice(curChoice)}
              isSelected={checkSelected(curChoice)}
            />
          </Fragment>
        ))}
        {choices.length % 2 === 0 ? null : <ButtonChoice disabled />}
      </>
    </StyledChoicesContainer>
  );
}

const StyledChoicesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
