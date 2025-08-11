import taskListsData from "@/services/mockData/taskLists.json";

class TaskListServiceClass {
  constructor() {
    this.taskLists = [...taskListsData];
  }

  // Simulate API delay
  delay(ms = 250) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.taskLists].sort((a, b) => a.order - b.order);
  }

  async getById(id) {
    await this.delay(200);
    const list = this.taskLists.find(l => l.Id === parseInt(id));
    if (!list) {
      throw new Error(`Task list with Id ${id} not found`);
    }
    return { ...list };
  }

  async create(listData) {
    await this.delay(350);
    
    const newList = {
      Id: Math.max(...this.taskLists.map(l => l.Id), 0) + 1,
      ...listData,
      order: this.taskLists.length + 1
    };
    
    this.taskLists.push(newList);
    return { ...newList };
  }

  async update(id, updateData) {
    await this.delay(300);
    
    const index = this.taskLists.findIndex(l => l.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task list with Id ${id} not found`);
    }
    
    this.taskLists[index] = {
      ...this.taskLists[index],
      ...updateData,
      Id: parseInt(id) // Ensure Id remains integer
    };
    
    return { ...this.taskLists[index] };
  }

  async delete(id) {
    await this.delay(250);
    
    const index = this.taskLists.findIndex(l => l.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task list with Id ${id} not found`);
    }
    
    const deletedList = { ...this.taskLists[index] };
    this.taskLists.splice(index, 1);
    return deletedList;
  }

  async reorder(listIds) {
    await this.delay(200);
    
    listIds.forEach((id, index) => {
      const listIndex = this.taskLists.findIndex(l => l.Id === parseInt(id));
      if (listIndex !== -1) {
        this.taskLists[listIndex].order = index + 1;
      }
    });
    
    return [...this.taskLists].sort((a, b) => a.order - b.order);
  }
}

export const TaskListService = new TaskListServiceClass();