export interface Todo {
    todo: string, 
    date: string, 
    completed: boolean,
    onTime: boolean | null, 
    timeRemaining: string
}