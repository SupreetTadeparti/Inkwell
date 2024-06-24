import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";

actor {
  type Color = { #A; #B; #C; #D; #E; #F; #G; #H };

  type Note = {
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

  public shared (msg) func uploadNote(content : Text, color : Color) : async () {
    let note : Note = {
      id = noteId;
      owner = msg.caller;
      content = content;
      color = color;
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

  private func noteEqual(a : Note, b : Note) : Bool {
    a.id == b.id;
  };

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

  public shared query (msg) func getNotes() : async [Note] {
    let notes : ?Buffer.Buffer<Note> = notesRecord.get(msg.caller);

    switch (notes) {
      case (null) {
        return [];
      };
      case (?noteBuffer) {
        return Buffer.toArray(noteBuffer);
      };
    };
  };

  public shared query (msg) func getNote(id : Nat) : async ?Note {
    let notes : ?Buffer.Buffer<Note> = notesRecord.get(msg.caller);

    switch (notes) {
      case (null) {
        return null;
      };
      case (?noteBuffer) {
        for (note in noteBuffer.vals()) {
          if (note.id == id) {
            assert note.owner == msg.caller;
            return ?note;
          };
        };
        return null;
      };
    };
  };
};
