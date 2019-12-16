import axios from 'axios';
import { Observable, Subject } from "rxjs";
import env from '../config/environments';
import { AgappeI } from '../models/Agappe';

let instance: BackService;

/**
 * Manage data with server
 * @author Ayoze Martín Hernández
 */
export class BackService {

  /**
   * updated list of agappes
   */
  private agappeList: AgappeI[] = [];

  /**
   * Emit updated list on changes
   */
  private _eventEmiter$: Subject<AgappeI[]> = new Subject<AgappeI[]>();

  constructor() {
    this.getAgappes();
  }

  /**
   * Expose observable of agappe list
   * @returns agappe list observable
   */
  public get eventEmiter$(): Observable<AgappeI[]> {
    return this._eventEmiter$.asObservable();
  }


  /**
   * Get all stored agappes
   */
  async getAgappes(): Promise<any> {
    this.agappeList = [...(await axios.get(`${env.back_uri}/agappe/all`)).data];
    this.updateData();
  }

  /**
   * Add new agappe
   * @param toInsert new agappe data
   */
  async addAgappe(toInsert: AgappeI): Promise<any> {
    const added: AgappeI = (await axios.post(`${env.back_uri}/agappe/add`, toInsert)).data;
    this.agappeList.push(added);
    this.updateData();
  }

  /**
   * Launch updated list
   */
  private updateData(): void {
    this._eventEmiter$.next(this.agappeList);
  }

  /**
   * Crete or get instance of service
   * @returns service instance
   */
  static create(): BackService {
    if (!instance) {
      instance = new BackService();
    }
    return instance;
  }
}