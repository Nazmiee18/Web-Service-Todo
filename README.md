# Web-Service-Todo
route.post('/login', login);
route.post('/regis', regis);
route.get("/", getAllUser);
route.get("/:id", verifyToken, getUserById);
route.get("/:id/todos", verifyToken ,getUserTodos)
route.post("/", createUser);
route.get('/', verifyToken, getAllTodo);
route.get('/:id', getTodoById);
route.post('/', createTodo);
route.put('/:id', updatedTodo);
route.delete('/:id', deletedTodo);
route.delete('/delete-all', deleteAllTodo);
