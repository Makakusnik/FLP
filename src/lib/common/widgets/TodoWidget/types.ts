export type TodoLabel = {
	color: string;
	textColor: string;
	text: string;
};

export type TodoItem = {
	id: string;
	title: string;
	subtitle: string;
	labels: TodoLabel[];
};

export type TodoData = {
	id: string;
	title: string;
	allTasks: number;
	completedTasks: number;
	children: TodoItem[];
};
