
interface INote {
    note: string;
    dateOfCreation: Date;
    dateOfEditing: Date;
    type: `default` | `require`;   
    status: string; 
}

class TodoList {
    protected listNotes: INote[];

    constructor() {
        this.listNotes = [];
    }

    public createNote(note: string, type: `default` | `require`): void {
        if (note.trim() === '') {
            console.log('Note cannot be empty');
            return;
        }
        this.listNotes.push({note, status: 'not completed',dateOfCreation: new Date(),dateOfEditing: new Date(), type});
        console.log(`You added the ${note} to your list!`)
    }

    public deleteNote(index: number): void {
        if (index >= 0 && index < this.listNotes.length) {
            const deletedNote = this.listNotes.splice(index, 1);
            console.log(`You deleted the note: ${deletedNote[0].note}`);
        } else {
            console.log(`Note with index ${index} does not exist`);
        }
    }

    public editNote(index: number, newNote: string): void {
        if (index >= 0 && index < this.listNotes.length) {
            const oldNote = this.listNotes[index].note;
            this.listNotes[index].note = newNote;
            console.log(`You changed ${oldNote} to ${newNote}!`);
        } else {
            console.log(`Note with index ${index} does not exist`);
        }
    }

    public showNotes(): void {
        console.log(`Your list:`)
        this.listNotes.forEach((note: INote, index: number) => {
            console.log(`${index + 1} ${note.note} ${note.status}`);
        })
    }

    public pinNote(index: number): void {
        if (index >= 0 && index < this.listNotes.length) {
            this.listNotes[index].status = 'completed';
            console.log(`You marked note ${this.listNotes[index].note} as completed!`);
        } else {
            console.log(`Note with index ${index} does not exist`);
        }
    }

    public countsOfNotes(): void {
        console.log(`Total notes: ${this.listNotes.length}`);
    }

    public howManyNotesNotCompleted(): void {
        let sumCompletesOfNotes = 0;
        this.listNotes.forEach(note => {
            if(note.status === 'not completed') {
                sumCompletesOfNotes += 1;
            }
        })
        console.log(`Uncompleted notes: ${sumCompletesOfNotes}`);
    }
    public sortNotesByStatus(): void {
        this.listNotes.sort((a, b) => a.status.localeCompare(b.status));
        console.log('Notes sorted by status');
    }

    public sortNotesByCreationTime(): void {
        this.listNotes.sort((a, b) => a.dateOfCreation.getTime() - b.dateOfCreation.getTime());
        console.log('Notes sorted by creation time');
    }
}

class searchNote extends TodoList {

    constructor() {
        super()
    }

    public findNoteByName(name: string): void {
        const foundNote = this.listNotes.find(note => note.note === name);
        if (foundNote) {
            console.log(`Found note: ${foundNote.note}`);
        } else {
            console.log(`No note found with name: ${name}`);
        }
    }

    public findNoteByContent(content: string): void {
        const foundNote = this.listNotes.find(note => note.note.includes(content));
        if (foundNote) {
            console.log(`Found note: ${foundNote.note}`);
        } else {
            console.log(`No note found with content: ${content}`);
        }
    }
}