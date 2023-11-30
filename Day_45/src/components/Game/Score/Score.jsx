import React from "react";
import ScoreItem from "./ScoreItem";
import { useSelector } from "react-redux";

const Score = () => {
   const score = useSelector(({ tblScore }) => tblScore.score);

   return (
      <div className="score">
         {score.map((item, id) => (
            <ScoreItem key={item.id} stt={id} score={item} />
         ))}
      </div>
   );
};

export default Score;
