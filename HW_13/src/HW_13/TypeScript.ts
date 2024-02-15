// Вам необхідно написати додаток Todo list. У списку нотаток повинні бути методи для додавання нового запису, 
// видалення, редагування та отримання повної інформації про нотатку за ідентифікатором, а так само отримання списку всіх нотаток. 
// Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те, 
// скільки всього нотаток у списку і скільки залишилося невиконаними. Нотатки не повинні бути порожніми.

// Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів. 
// Дефолтні та такі, які вимагають підтвердження при ридагуванні.
// Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка за ім'ям або змістом.
// Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

type idNote = number;

interface INote {
    title: string;
    content: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    id: idNote;
    isCompleted: boolean;
}

type NoteUpdated = Partial<Pick<INote, 'title' | 'content'>>;

interface ITodoList {
    addNote(title: string, content: string): void;
    deleteNote(id: idNote): void;
    updateNote(id: idNote, payload: NoteUpdated): INote;
    getNoteById(id: idNote) : INote | undefined;
    getNotes(): INote[];
    findByIndex(id: idNote): number;
    getUncompletedNotes(): INote[];
    searchNotes(query: string): INote[];
    sortNotesByStatus(): INote[];
    sortNotesByCreationTime(): INote[];
}

class TodoList implements ITodoList {
    public notes: INote[] = [];

    public addNote(title: string, content: string): void {
        const note: INote = new Note(title, content);
        this.notes.push(note);
    }

    public deleteNote(id: idNote): void {
        const index = this.findByIndex(id);
        if (index !== -1) {
            this.notes.splice(index, 1);
        } else {
            throw new Error('Нотатка не знайдена');
        }
    }

    public updateNote(id: idNote, payload: NoteUpdated): INote {
        const note = this.getNoteById(id);
        if (note) {
            note.title = payload.title || note.title;
            note.content = payload.content || note.content;
            note.updatedAt = new Date();
            return note;
        } else {
            throw new Error('Нотатка не знайдена');
        }
    }

    public getNoteById(id: idNote): INote | undefined {
        return this.notes.find(note => note.id === id);
    }

    public getNotes(): INote[] {
        return this.notes;
    }

    public getUncompletedNotes(): INote[] {
        return this.notes.filter(note => !note.isCompleted);
    }

    public searchNotes(query: string): INote[] {
        return this.notes.filter(note => note.title.includes(query) || note.content.includes(query));
    }

    public sortNotesByStatus(): INote[] {
        return [...this.notes].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    }

    public sortNotesByCreationTime(): INote[] {
        return [...this.notes].sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt));
            } else {
                return 0;
            }
        });
    }
    

    public findByIndex(id: idNote): number {
        return this.notes.findIndex(note => note.id === id);
    }
}

class BaseNote implements INote {
    id: idNote;
    createdAt: Date | null;
    updatedAt: Date | null;
    isCompleted: boolean;

    constructor(public title: string, public content: string) {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.isCompleted = false;
        this.id = Math.random();
    }
}

class Note extends BaseNote {
    public update(payload: NoteUpdated): void {
        this.title = payload.title || this.title;
        this.content = payload.content || this.content;
        this.updatedAt = new Date()
    }
}
