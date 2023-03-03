import styled from "styled-components";
import { useState, useEffect, useRef, Fragment, ReactNode } from "react";
import ButtonChoice from "./ButtonChoice";

export type QuestionCardsProps = {
  title: string;
  choices: string[];
  handleChoice: (choice: string | null, title: string) => void;
  describes?: ReactNode[];
};

export default function QuestionCards({
  title,
  choices,
  handleChoice,
  describes,
}: QuestionCardsProps) {
  const isInitailRendering = useRef(true);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const checkSelected = (choice: string) => selectedChoice === choice;

  const onClickChoice = (selectedChoice: string) => {
    if (checkSelected(selectedChoice)) {
      setSelectedChoice(null);
    } else {
      setSelectedChoice(selectedChoice);
    }
  };

  useEffect(() => {
    if (isInitailRendering.current) isInitailRendering.current = false;
    else handleChoice(selectedChoice, title);
  }, [selectedChoice]);

  return (
    <StyledChoicesContainer>
      <>
        {choices.map((choice, i) => (
          <Fragment key={choice}>
            <ButtonChoice
              value={choice}
              title={String(choice)}
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
