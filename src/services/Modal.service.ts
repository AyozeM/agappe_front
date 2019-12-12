import { Observable, Subject } from "rxjs";

let instance: ModalService;
export const getInstance = () => {
  if (!instance) {
    instance = new ModalService();
  }
  return instance;
}

export class ModalService {
  private _openedModal: JSX.Element;
  private _isOpen: boolean = false;
  private _modalUpdate: Subject<JSX.Element> = new Subject();

  get modalUpdate$(): Observable<JSX.Element> {
    return this._modalUpdate.asObservable();
  }

  get openedModal(): JSX.Element {
    return this._openedModal;
  }
  get isOpen(): boolean {
    return this._isOpen;
  }

  open(component: JSX.Element) {
    this._isOpen = true;
    this._openedModal = component;
    this._modalUpdate.next(component);
  }

  close() {
    this._isOpen = false;
    this._openedModal = null;
    this._modalUpdate.next(undefined);
  }
}