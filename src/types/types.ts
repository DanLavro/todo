export interface Task {
  id: number
  name: string
  done: boolean
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  tasks: Task[]
}

export interface Payment {
  id: number
  userId: number
  title: string
  amount: number
  date: string
}
