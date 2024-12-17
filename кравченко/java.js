class NoteKeeper {
    constructor() {
        this.notes = this.loadNotes();
    }

    loadNotes() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    addNote(note) {
        this.notes.push(note);
        this.saveNotes();
    }

    removeNote(index) {
        this.notes.splice(index, 1);
        this.saveNotes();
    }

    editNote(index, updatedNote) {
        this.notes[index] = updatedNote;
        this.saveNotes();
    }

    getNotes() {
        return this.notes;
    }
}

const noteKeeper = new NoteKeeper();
const noteList = document.getElementById('note-list');
const noteInput = document.getElementById('note-input');

function renderNotes() {
    noteList.innerHTML = '';
    noteKeeper.getNotes().forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;
        li.appendChild(createDeleteButton(index));
        noteList.appendChild(li);
    });
}

function createDeleteButton(index) {
    const button = document.createElement('button');
    button.textContent = 'Удалить';
    button.onclick = () => {
        noteKeeper.removeNote(index);
        renderNotes();
    };
    return button;
}

document.getElementById('add-note').onclick = () => {
    const noteText = noteInput.value;
    if (noteText) {
        noteKeeper.addNote(noteText);
        noteInput.value = '';
        renderNotes();
    }
};

// Инициализация
renderNotes();
