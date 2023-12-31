export type TodoLabel = {
	color: string;
	textColor: string;
	text: string;
};

export type TodoData = {
	id: string;
	title: string;
	date: string;
	children: Task[];
};

export type Task = {
	id: string;
	name: string;
};
