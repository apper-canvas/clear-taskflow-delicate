import tasksData from "@/services/mockData/tasks.json";

class TaskServiceClass {
  constructor() {
    this.tasks = [...tasksData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay(200);
    const task = this.tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error(`Task with Id ${id} not found`);
    }
    return { ...task };
  }

  async create(taskData) {
    await this.delay(400);
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      archived: false
    };
    
    this.tasks.push(newTask);
    return { ...newTask };
  }

  async update(id, updateData) {
    await this.delay(300);
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with Id ${id} not found`);
    }
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...updateData,
      Id: parseInt(id) // Ensure Id remains integer
    };
    
    return { ...this.tasks[index] };
  }

  async delete(id) {
    await this.delay(250);
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with Id ${id} not found`);
    }
    
    const deletedTask = { ...this.tasks[index] };
    this.tasks.splice(index, 1);
    return deletedTask;
  }

  async getByListId(listId) {
    await this.delay(200);
    return this.tasks.filter(t => t.listId === parseInt(listId));
  }

  async toggleComplete(id) {
    await this.delay(200);
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with Id ${id} not found`);
    }
    
    this.tasks[index].completed = !this.tasks[index].completed;
    return { ...this.tasks[index] };
  }

  async archive(id) {
    await this.delay(200);
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with Id ${id} not found`);
    }
    
    this.tasks[index].archived = true;
    return { ...this.tasks[index] };
  }
}

export const TaskService = new TaskServiceClass();