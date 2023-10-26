export function confirmation(node: Element, resolve: (e: Event) => void) {
	node.addEventListener('resolve', resolve, true);

	return {
		destroy() {
			node.removeEventListener('resolve', resolve, true);
		}
	};
}
