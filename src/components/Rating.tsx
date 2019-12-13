import React, { useState } from 'react';

let styles = {
  heart: {
    color: 'var(--heart-color,tomato)',
    transition: '.5',
  }
}
interface RatingParams {
  score: number;
  onUpdate?: (score: number) => void;
  active?: boolean;
  max?: number
}

export const Rating = ({ score, onUpdate, active = false, max = 5 }: RatingParams) => {
  const [tempScore, setTempScore] = useState(score);
  const [realScore, setRealScore] = useState(score);

  const stars: JSX.Element[] = new Array(max).fill(null);
  const toggleHover = (index: number, on: boolean) => {
    if (active) {
      setTempScore(on ? ++index : realScore);
    }
  }

  const saveScore = (value: number) => {
    if (active) {
      const auxScore: number = ++value; 
      setRealScore(auxScore);
      onUpdate(auxScore);
    }
  }
  return (
    <section>
      {stars.map((e: JSX.Element, i: number) => {
        return (
          <span className="material-icons" key={i}
            style={{ ...styles.heart, cursor: active ? 'pointer' : 'default' }}
            onMouseEnter={() => toggleHover(i, true)}
            onMouseLeave={() => toggleHover(i, false)}
            onClick={() => saveScore(i)}
          >{i < (tempScore || realScore) ? 'favorite' : 'favorite_border'}</span>
        )
      })}
    </section >
  )
}