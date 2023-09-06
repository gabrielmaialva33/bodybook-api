export abstract class BaseModel {
  static tableName: string;

  static get fields() {
    return Object.keys(this);
  }

  static get values(): any[] {
    return Object.values(this);
  }
}

export type Model = typeof BaseModel;
