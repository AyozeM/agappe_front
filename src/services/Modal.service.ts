import { Observable, Subject } from "rxjs";

let instance: ModalService;

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

  /**
   * Open new modal
   * @param component body component of modal
   */
  open(component: JSX.Element) {
    this._isOpen = true;
    this._openedModal = component;
    this._modalUpdate.next(component);
  }

  /**
   * Close opened modal
   */
  close() {
    this._isOpen = false;
    this._openedModal = null;
    this._modalUpdate.next(undefined);
  }

  /**
   * Create or get instance of service
   */
  static create() {
    if (!instance) {
      instance = new ModalService();
    }
    return instance;
  }
}