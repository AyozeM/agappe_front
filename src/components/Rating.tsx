import React from 'react';

const styles = {
  heart: {
    color: 'var(--heart-color,tomato)',
    hoverColor: 'var(--heart-hover-color,red)',
    transition: '.5',
    cursor: 'pointer'
  }
}
export const Rating = ({ score, active = false }: { score: number, active?: boolean }) => {
  if (!active) {
    delete (styles.heart.cursor);
  }
  const stars: JSX.Element[] = new Array(score).fill(null);
  if (active) {
    styles.heart = {
      ...styles.heart,

    }
  }
  const toggleHover = (e: any, on: boolean) => {
    const { hoverColor, color } = styles.heart;
    if (active) {
      e.style.color = on ? hoverColor : color;
    }
  }
  return (
    <section>
      {stars.map((e: JSX.Element, i: number) => (
        <span className="material-icons" key={i}
          style={styles.heart}
          onMouseEnter={y => toggleHover(y.target, true)}
          onMouseLeave={y => toggleHover(y.target, false)}
        >favorite</span>
      ))}
    </section >
  )
}