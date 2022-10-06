export interface IPosts {
  selectCategory: string,
  title:string,
  description:string,
  foto:string,
  content:string,
  img: string,
  data?: Date,
  favorite: boolean,
  comments?:[]
}
