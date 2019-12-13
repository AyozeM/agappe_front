import React, { useState } from 'react';
import { Subject } from "rxjs";
import './App.css';
import { Card } from "./components/card";
import { Modal } from "./components/Modal";
import { RegisterForm } from "./components/RegisterForm";
import { BackService } from "./services/back.service";
import { ModalService } from "./services/Modal.service";

// Get active service
const backService: BackService = BackService.create();
const modalService: ModalService = ModalService.create();

const styles = {
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridAutoRows: 'minmax(100px, auto)',
    gap: '1em',
    padding: '1%'
  },
  empty: {
    border: '1px dashed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--add-button-default, lightgray)',
    cursor: 'pointer',
    alignSelf: 'strech'
  }
}

const App: React.FC = () => {

  const [agappeList, setAgappeList] = useState([] as any[]);
  backService.eventEmiter$.subscribe((list: any[]) => setAgappeList([...list]));
  const toSend: Subject<any> = new Subject();
  toSend.asObservable().subscribe(e => {
    backService.addAgappe(e);
    modalService.close();
  })

  const createAgappe = () => {
    modalService.open(
      <RegisterForm subject={toSend}></RegisterForm>
    );
  }

  return (
    <div>
      <Modal></Modal>
      <h1 className="mainTitle">Agappes</h1>
      <section>
      </section>
      <section style={styles.list}>
        {
          agappeList.map((e, i: number) => (
            <Card data={e} key={i}></Card>
          ))
        }
        <div className="card"
          style={styles.empty}
          onClick={createAgappe}
          onMouseEnter={({ target }) => (target as HTMLElement).style.color = 'var(--add-button-active,gray)'}
          onMouseLeave={({ target }) => (target as HTMLElement).style.color = styles.empty.color}
        >
          <span>Añadir agappe</span>
          <i className="material-icons">add</i>
        </div>
      </section>
    </div>
  );
}

export default App;
