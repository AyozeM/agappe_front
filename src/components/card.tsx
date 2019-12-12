import React from 'react';
import { AgappeI } from "../models/Agappe";
import { Rating } from "./Rating";

const styles = {
  card: {
    padding: '2% 4%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 50%)',
    gridRowGap: '1em',
  },
  left: {
    justifySelf: 'end'
  }
}

export const Card = ({ data }: { data: AgappeI }) => {
  const formatDate = (date: Date) => new Date(date).toISOString().split('T')[0].split('-').reverse().join('/');
  const { author, score, date, title } = data;
  return (
    <div style={styles.card} className="card">
      <span className="title">{title}</span>
      <span style={styles.left}>{formatDate(date)}</span>
      <span>{author}</span>
      <span style={styles.left}><Rating score={score} /></span>

    </div>
  );
}