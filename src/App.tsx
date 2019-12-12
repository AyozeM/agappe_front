import React, { useState } from 'react';
import { Subject } from "rxjs";
import './App.css';
import { Card } from "./components/card";
import { Modal } from "./components/Modal";
import { RegisterForm } from "./components/RegisterForm";
import { BackService, getInstance as GetBackInstance } from "./services/back.service";
import { getInstance as GetModalInstance, ModalService } from "./services/Modal.service";

// Get active service
const backService: BackService = GetBackInstance();
const modalService: ModalService = GetModalInstance();

const styles = {
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: '1em',
    gridTemplateRows: 'minmax(50px)'
  },
  empty: {
    border: '1px dashed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'lightgray',
    cursor: 'pointer',
    alignSelf: 'strech'
  }
}

const App: React.FC = () => {

  const [agappeList, setAgappeList] = useState([] as any[]);
  const [viewModal, setViewModal] = useState(false);
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
      <section>
        <h1>Agappes</h1>
      </section>
      <section style={styles.list}>
        {
          agappeList.map((e, i: number) => (
            <Card data={e} key={i}></Card>
          ))
        }
        <div className="card" style={styles.empty} onClick={createAgappe}>
          <i className="material-icons">add</i>
        </div>
      </section>
    </div>
  );
}

export default App;
