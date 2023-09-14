import { Item } from './item.interface'

export interface Employee {
  empId: number
  todo: Item[]
  done: Item[]
}