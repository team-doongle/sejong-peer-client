import styled from "styled-components";
import { useState, useEffect, useRef, Fragment, ReactNode } from "react";
import ButtonChoice from "./ButtonChoice";

export type QuestionCardProps = {
  choices: string[];
  handleChoice: (choice: string) => void;
  describes?: ReactNode[];
};

export default function QuestionCards({
  choices,
  handleChoice,
  describes,
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
        {choices.map((choice, i) => (
          <Fragment key={choice}>
            <ButtonChoice
              value={choice}
              title={choice}
              describe={describes?.[i]}
              onClick={() => onClickChoice(choice)}
              isSelected={checkSelected(choice)}
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
