export type Confirmation = 'confirm' | 'discard' | 'cancel';
export type ConfirmationEvent = CustomEvent<Confirmation>;
export type ConfirmationEventMap = { resolve: Confirmation };
