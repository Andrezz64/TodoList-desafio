import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]); // armazerna em um array as Tasks
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return; // Valida se o titulo está vazio, caso esteja trava a execução.

    const newTask = { // objeto seguindo os moldes ts 
      id: Math.random(), // Criação de um id aleatorio (Metodo apenas para teste)
      title: newTaskTitle,
      isComplete: false // Dever começar em falso para que seja alterado pelo usuário
    };
    setTasks(oldState => [...oldState, newTask]) // cria um novo array usando os valores antigos, mas adicionando a nova task ao final
    setNewTaskTitle('') // reseta o valor do inputa para vazio apos a execução
    
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const TaskListRemove = tasks.map(tasks => tasks.id === id ? {
      ...tasks,
      isComplete: !tasks.isComplete
    }:tasks)

    setTasks(TaskListRemove)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const taskFiltered = tasks.filter(task => task.id != id) // filtra o array, deixando somente aquilo qué não é o id da task que será excluida.

    setTasks(taskFiltered) // respeitando a imutabilidade, atribui ao estado o novo array filtrado
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}