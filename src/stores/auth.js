import { writable } from 'svelte/store';

export const isAuthed = writable(false);
export const jwt = writable("poo");

export const user = writable(null);