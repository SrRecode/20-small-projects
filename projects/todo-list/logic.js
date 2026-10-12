/** An in-memory todo list model. */
export function createTodoList() {
  let items = [];
  let seq = 0;

  return {
    add(title) {
      const text = String(title ?? '').trim();
      if (!text) throw new Error('Title is required');
      const item = { id: ++seq, title: text, done: false };
      items = [...items, item];
      return item;
    },
    toggle(id) {
      items = items.map((item) => (item.id === id ? { ...item, done: !item.done } : item));
      return this.all();
    },
    remove(id) {
      items = items.filter((item) => item.id !== id);
      return this.all();
    },
    clearCompleted() {
      items = items.filter((item) => !item.done);
      return this.all();
    },
    filter(status = 'all') {
      if (status === 'active') return items.filter((i) => !i.done);
      if (status === 'completed') return items.filter((i) => i.done);
      return [...items];
    },
    all() {
      return [...items];
    },
    get remaining() {
      return items.filter((i) => !i.done).length;
    },
  };
}
