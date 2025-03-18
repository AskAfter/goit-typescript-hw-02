import { FC } from "react";

interface LoadMoreBtnProps {
  handleClick: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ handleClick }) => {
  return (
    <button type="button" onClick={handleClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
