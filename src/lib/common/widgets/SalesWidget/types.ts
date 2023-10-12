export type Order = {
	id: string;
	items: Item[];
	person: Person;
};

type Item = {
	name: string;
	boughtAtPrice: number;
	quantity: number;
};

type Person = {
	name: string;
	address: string;
};
