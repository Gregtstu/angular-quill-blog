export interface IPosts {
  selectCategory: string,
  title:string,
  description:string,
  foto:string,
  content:string,
  img: string,
  id?: any,
  data?: Date,
  favorite: boolean,
  comments?:[]
}
