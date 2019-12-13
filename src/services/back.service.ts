import axios from 'axios';
import { Observable, Subject } from "rxjs";
import env from '../config/environments';

let instance: BackService;

/**
 * Manage data with server
 */
export class BackService {

  /**
   * updated list of agappes
   */
  private agappeList: any[] = [];

  /**
   * Emit updated list on changes
   */
  private _eventEmiter$: Subject<any[]> = new Subject<any[]>();

  constructor() {
    this.getAgappes();
  }

  /**
   * Expose observable of agappe list
   * @returns agappe list observable
   */
  public get eventEmiter$(): Observable<any[]> {
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
  async addAgappe(toInsert: any): Promise<any> {
    const added: any = (await axios.post(`${env.back_uri}/agappe/add`, toInsert)).data;
    this.agappeList.push(added);
    this.updateData();
  }

  /**
   * Launch updated list
   */
  private updateData() {
    this._eventEmiter$.next(this.agappeList);
  }

  /**
   * Crete or get instance of service
   */
  static create() {
    if (!instance) {
      instance = new BackService();
    }
    return instance;
  }
}