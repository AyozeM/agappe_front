import React, { useState } from 'react';
import { Subject } from "rxjs";
import './RegisterForm.css';
import { AgappeI } from '../models/Agappe';
import { Rating } from "./Rating";

export const RegisterForm = ({ subject }: { subject: Subject<any> }) => {
  const [date, setDateChange] = useState(new Date().toISOString().substr(0, 10));
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [score, setScore] = useState(0);


  const create = async () => {
    try {
      const agappe: AgappeI = { date: new Date(date), author, title, score };
      subject.next(validations(agappe));
    } catch (error) {
      alert(error)
      console.error(error);
    }
  }

  const validations = (toCheck: AgappeI) => {
    if (!Object.values(toCheck).every(e => e)) {
      throw new Error(`Todos los campos tienes que estar rellenos, revisar ${Object.entries(toCheck).filter(e => !e[1]).map(e => e[0]).join(',')}`);
    }
    return { ...toCheck, date: toCheck.date.toISOString() }
  }
  return (
    <div>
      <input type="text" defaultValue={author} placeholder="Autor" onChange={e => setAuthor(e.target.value)} />
      <input type="text" defaultValue={title} placeholder="Titulo" onChange={e => setTitle(e.target.value)} />
      <input type="date" defaultValue={date} placeholder="Fecha" onChangeCapture={e => setDateChange((e.target as HTMLInputElement).value)} />
      <Rating score={0} active={true} onUpdate={e => setScore(e)}></Rating>
      <button onClick={create} className="waves-effect waves-light btn">crear</button>
    </div>
  );
};