export type TodoLabel = {
	color: string;
	textColor: string;
	text: string;
};

export type TodoItem = {
	title: string;
	subtitle: string;
	labels: TodoLabel[];
};

export type TodoData = {
	title: string;
	allTasks: number;
	completedTasks: number;
	children: TodoItem[];
};
