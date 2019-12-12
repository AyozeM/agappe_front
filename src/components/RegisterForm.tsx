import React, { useState } from 'react';
import { Subject } from "rxjs";
import './RegisterForm.css';
export const RegisterForm = ({ subject }: { subject: Subject<any> }) => {
  const [date, setDateChange] = useState(new Date().toISOString().substr(0, 10));
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [score, setScore] = useState(0);


  const create = async () => {
    const agappe = { date: new Date(date).toISOString(), author, title, score };
    subject.next(agappe);
  }
  return (
    <div>
      <input type="text" defaultValue={author} required placeholder="Autor" onChange={e => setAuthor(e.target.value)} />
      <input type="text" defaultValue={title} required placeholder="Titulo" onChange={e => setTitle(e.target.value)} />
      <input type="date" defaultValue={date} required placeholder="Fecha" onChangeCapture={e => setDateChange((e.target as HTMLInputElement).value)} />
      <input type="number" defaultValue={score} required placeholder="Puntuacion" onChange={e => setScore(+e.target.value)} min="1" max="5" />
      <button onClick={create} className="waves-effect waves-light btn">crear</button>
    </div>
  );
};