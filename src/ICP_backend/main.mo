import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";

actor {
  type Color = { #A; #B; #C; #D; #E; #F; #G; #H };

  type Note = {
    id : Nat;
    owner : Principal;
    var content : Text;
    var color : Color;
  };

  type SharedNote = {
    id : Nat;
    owner : Principal;
    content : Text;
    color : Color;
  };

  var noteId : Nat = 0;

  private let notesRecord : HashMap.HashMap<Principal, Buffer.Buffer<Note>> = HashMap.HashMap<Principal, Buffer.Buffer<Note>>(
    0,
    Principal.equal,
    Principal.hash,
  );

  private func noteEqual(a : Note, b : Note) : Bool {
    a.id == b.id;
  };

  // Create
  public shared (msg) func createNote(content : Text, color : Color) : async () {
    let note : Note = {
      id = noteId;
      owner = msg.caller;
      var content = content;
      var color = color;
    };

    noteId += 1;

    let notes : ?Buffer.Buffer<Note> = notesRecord.get(msg.caller);

    switch (notes) {
      case (null) {
        let newNoteBuffer : Buffer.Buffer<Note> = Buffer.Buffer<Note>(1);
        newNoteBuffer.add(note);
        notesRecord.put(msg.caller, newNoteBuffer);
      };
      case (?noteBuffer) {
        noteBuffer.add(note);
        notesRecord.put(msg.caller, noteBuffer);
      };
    };
  };

  // Read
  private func noteToSharedNote(note : Note) : SharedNote {
    {
      id = note.id;
      owner = note.owner;
      content = note.content;
      color = note.color;
    };
  };

  public shared query (msg) func getNotes() : async [SharedNote] {
    let notes : ?Buffer.Buffer<Note> = notesRecord.get(msg.caller);

    switch (notes) {
      case (null) {
        return [];
      };
      case (?noteBuffer) {
        return Buffer.toArray(Buffer.map<Note, SharedNote>(noteBuffer, noteToSharedNote));
      };
    };
  };

  public shared query (msg) func getNote(id : Nat) : async ?SharedNote {
    let notes : ?Buffer.Buffer<Note> = notesRecord.get(msg.caller);

    switch (notes) {
      case (null) {
        return null;
      };
      case (?noteBuffer) {
        for (note in noteBuffer.vals()) {
          if (note.id == id) {
            assert note.owner == msg.caller;
            return ?noteToSharedNote(note);
          };
        };
        return null;
      };
    };
  };

  private func getInternalNote(caller : Principal, id : Nat) : ?Note {
    let notes : ?Buffer.Buffer<Note> = notesRecord.get(caller);

    switch (notes) {
      case (null) {
        null;
      };
      case (?noteBuffer) {
        for (note in noteBuffer.vals()) {
          if (note.id == id) {
            assert note.owner == caller;
            return ?note;
          };
        };
        return null;
      };
    };
  };

  // Update
  public shared (msg) func updateNote(id : Nat, content : Text, color : Color) : async () {
    let note : ?Note = getInternalNote(msg.caller, id);

    switch (note) {
      case (null) {
        return;
      };
      case (?noteToUpdate) {
        noteToUpdate.content := content;
        noteToUpdate.color := color;
      };
    };
  };

  // Delete
  public shared (msg) func deleteNote(id : Nat) : async () {
    let notes : ?Buffer.Buffer<Note> = notesRecord.get(msg.caller);

    switch (notes) {
      case (null) {};
      case (?noteBuffer) {
        for (note in noteBuffer.vals()) {
          if (note.id == id) {
            assert note.owner == msg.caller;
            let _dont_delete_me = Buffer.indexOf<Note>(note, noteBuffer, noteEqual);
          };
        };
      };
    };
  };
};
