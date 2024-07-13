import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

actor {

  type Category = {
    id : Nat;
    owner : Principal;
    var name : Text;
    var color : Text;
  };

  type SharedCategory = {
    id : Nat;
    owner : Principal;
    name : Text;
    color : Text;
  };

  type AccessLevel = {
    #ReadOnly;
    #ReadWrite;
  };

  type OperationResult = {
    #Success;
    #Failure : Text;
  };

  type SharedNoteAccess = {
    sharedWith : Principal;
    accessLevel : AccessLevel;
  };

  type Note = {
    id : Nat;
    owner : Principal;
    var title : Text;
    var content : Text;
    var category : ?SharedCategory;
    var sharedAccess : Buffer.Buffer<SharedNoteAccess>;
  };

  type SharedNote = {
    id : Nat;
    owner : Principal;
    title : Text;
    content : Text;
    category : ?SharedCategory;
    sharedAccess : [SharedNoteAccess];
  };

  var noteId : Nat = 0;
  var categoryId : Nat = 0;
  var shareIdCounter : Nat = 0;

  private let notesRecord : HashMap.HashMap<Principal, Buffer.Buffer<Note>> = HashMap.HashMap<Principal, Buffer.Buffer<Note>>(
    0,
    Principal.equal,
    Principal.hash,
  );

  private let categoryRecord : HashMap.HashMap<Principal, Buffer.Buffer<Category>> = HashMap.HashMap<Principal, Buffer.Buffer<Category>>(
    0,
    Principal.equal,
    Principal.hash,
  );

  private let shareIdToPrincipal : HashMap.HashMap<Nat, Principal> = HashMap.HashMap<Nat, Principal>(
    0,
    Nat.equal,
    Hash.hash,
  );

  private func noteToSharedNote(note : Note) : SharedNote {
    {
      id = note.id;
      owner = note.owner;
      title = note.title;
      content = note.content;
      category = note.category;
      sharedAccess = Buffer.toArray(note.sharedAccess);
    };
  };

  private func categoryToSharedCategory(category : Category) : SharedCategory {
    {
      id = category.id;
      owner = category.owner;
      name = category.name;
      color = category.color;
    };
  };

  private func addNoteToBuffer(user : Principal, note : Note) {
    let notes : ?Buffer.Buffer<Note> = notesRecord.get(user);

    switch (notes) {
      case (null) {
        let newNoteBuffer : Buffer.Buffer<Note> = Buffer.Buffer<Note>(1);
        newNoteBuffer.add(note);
        notesRecord.put(user, newNoteBuffer);
      };
      case (?noteBuffer) {
        noteBuffer.add(note);
      };
    };
  };

  private func removeNoteFromBuffer(user : Principal, noteId : Nat, caller : ?Principal) : OperationResult {
    let notes : ?Buffer.Buffer<Note> = notesRecord.get(user);

    let owner : Principal = Option.get(caller, user);

    switch (notes) {
      case (null) {
        return #Failure("Note not found");
      };
      case (?noteBuffer) {
        var i = 0;
        while (i < noteBuffer.size()) {
          let note = noteBuffer.get(i);
          if (note.id == noteId and note.owner == owner) {
            let _dont_delete_me = noteBuffer.remove(i);
            return #Success;
          };
          i += 1;
        };
        return #Failure("Only the owner can delete the note");
      };
    };
  };

  // Create

  public shared (msg) func createNote(title : Text, content : Text, category : ?SharedCategory) : async Nat {
    let note : Note = {
      id = noteId;
      owner = msg.caller;
      var title = title;
      var content = content;
      var category = category;
      var sharedAccess = Buffer.Buffer<SharedNoteAccess>(0);
    };

    noteId += 1;

    addNoteToBuffer(msg.caller, note);

    noteId - 1;
  };

  public shared (msg) func createCategory(name : Text, color : Text) : async () {
    let category : Category = {
      id = categoryId;
      owner = msg.caller;
      var name = name;
      var color = color;
    };

    categoryId += 1;

    let categories : ?Buffer.Buffer<Category> = categoryRecord.get(msg.caller);

    switch (categories) {
      case (null) {
        let newCategoryBuffer : Buffer.Buffer<Category> = Buffer.Buffer<Category>(1);
        newCategoryBuffer.add(category);
        categoryRecord.put(msg.caller, newCategoryBuffer);
      };
      case (?categoryBuffer) {
        categoryBuffer.add(category);
      };
    };
  };

  // Read
  public shared query (msg) func getNotes() : async [SharedNote] {
    let notes = switch (notesRecord.get(msg.caller)) {
      case (null) { [] };
      case (?noteBuffer) { Buffer.toArray(noteBuffer) };
    };

    Array.map<Note, SharedNote>(
      notes,
      noteToSharedNote,
    );
  };

  public shared query (msg) func getCategories() : async [SharedCategory] {
    let categories = switch (categoryRecord.get(msg.caller)) {
      case (null) { [] };
      case (?categoryBuffer) { Buffer.toArray(categoryBuffer) };
    };

    Array.map<Category, SharedCategory>(
      categories,
      categoryToSharedCategory,
    );
  };

  public shared query (msg) func getNote(id : Nat) : async ?SharedNote {
    let note = getInternalNote(msg.caller, id);

    switch (note) {
      case (null) {
        null;
      };
      case (?foundNote) {
        ?noteToSharedNote(foundNote);
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
            assert note.owner == caller or Array.find<SharedNoteAccess>(
              Buffer.toArray(note.sharedAccess),
              func(access : SharedNoteAccess) : Bool {
                access.sharedWith == caller;
              },
            ) != null;
            return ?note;
          };
        };
        return null;
      };
    };
  };

  private func getInternalCategory(caller : Principal, id : Nat) : ?Category {
    let categories : ?Buffer.Buffer<Category> = categoryRecord.get(caller);

    switch (categories) {
      case (null) {
        null;
      };
      case (?categoryBuffer) {
        for (category in categoryBuffer.vals()) {
          if (category.id == id) {
            assert category.owner == caller;
            return ?category;
          };
        };
        return null;
      };
    };
  };

  // Update
  public shared (msg) func updateNote(id : Nat, title : Text, content : Text, category : ?SharedCategory) : async OperationResult {
    let note : ?Note = getInternalNote(msg.caller, id);

    switch (note) {
      case (null) {
        return #Failure("Note not found");
      };
      case (?noteToUpdate) {
        if (
          noteToUpdate.owner == msg.caller or Array.find<SharedNoteAccess>(
            Buffer.toArray(noteToUpdate.sharedAccess),
            func(access : SharedNoteAccess) : Bool {
              access.sharedWith == msg.caller and access.accessLevel == #ReadWrite;
            },
          ) != null
        ) {
          noteToUpdate.title := title;
          noteToUpdate.content := content;
          noteToUpdate.category := category;

          return #Success;
        };

        return #Failure("You do not have the permission to update this note");

      };
    };
  };

  public shared (msg) func updateCategory(id : Nat, name : Text, color : Text) : async () {
    let category : ?Category = getInternalCategory(msg.caller, id);

    switch (category) {
      case (null) {
        return;
      };
      case (?categoryToUpdate) {
        categoryToUpdate.name := name;
        categoryToUpdate.color := color;

        let notes : ?Buffer.Buffer<Note> = notesRecord.get(msg.caller);

        switch (notes) {
          case (null) {};
          case (?noteBuffer) {
            for (note in noteBuffer.vals()) {
              switch (note.category) {
                case (null) {};
                case (?category) {
                  note.category := ?categoryToSharedCategory(categoryToUpdate);
                };
              };
            };
          };
        };
      };
    };
  };

  // Delete

  public shared (msg) func deleteNote(id : Nat) : async OperationResult {
    removeNoteFromBuffer(msg.caller, id, null);
  };

  public shared (msg) func deleteCategory(id : Nat) : async () {
    let categories : ?Buffer.Buffer<Category> = categoryRecord.get(msg.caller);

    switch (categories) {
      case (null) {};
      case (?categoryBuffer) {
        var i = 0;
        while (i < categoryBuffer.size()) {
          let category = categoryBuffer.get(i);
          if (category.id == id and category.owner == msg.caller) {
            let _dont_delete_me = categoryBuffer.remove(i);
            return;
          };
          i += 1;
        };
      };
    };
  };

  // Share

  public shared (msg) func generateShareId() : async Nat {
    var existingShareId : ?Nat = null;

    for (id in shareIdToPrincipal.keys()) {
      if (shareIdToPrincipal.get(id) == ?msg.caller) {
        existingShareId := ?id;
      };
    };

    switch (existingShareId) {
      case (?id) {
        return id;
      };
      case (null) {
        let newShareId = shareIdCounter;
        shareIdCounter += 1;
        shareIdToPrincipal.put(newShareId, msg.caller);
        return newShareId;
      };
    };
  };

  public shared (msg) func shareNote(noteId : Nat, shareId : Nat, accessLevel : AccessLevel) : async OperationResult {
    var principalOpt = shareIdToPrincipal.get(shareId);

    if (principalOpt == null) {
      let newShareId = await generateShareId();
      principalOpt := shareIdToPrincipal.get(newShareId);
    };

    switch (principalOpt) {
      case (null) {
        return #Failure("Share ID not found");
      };
      case (?sharedWith) {
        let note : ?Note = getInternalNote(msg.caller, noteId);

        switch (note) {
          case (null) {
            return #Failure("Only the owner can share this note");
          };
          case (?noteToShare) {
            let newAccess : SharedNoteAccess = {
              sharedWith = sharedWith;
              accessLevel = accessLevel;
            };
            noteToShare.sharedAccess.add(newAccess);

            addNoteToBuffer(sharedWith, noteToShare);

            return #Success;
          };
        };
      };
    };
  };

  public shared (msg) func unshareNote(noteId : Nat, shareId : Nat) : async OperationResult {
    var principalOpt = shareIdToPrincipal.get(shareId);

    if (principalOpt == null) {
      let newShareId = await generateShareId();
      principalOpt := shareIdToPrincipal.get(newShareId);
    };

    switch (principalOpt) {
      case (null) {
        return #Failure("Share ID not found");
      };
      case (?sharedWith) {
        let note : ?Note = getInternalNote(msg.caller, noteId);

        switch (note) {
          case (null) {
            return #Failure("Only the owner can share this note");
          };
          case (?noteToUnshare) {
            let updatedSharedAccess = Array.filter<SharedNoteAccess>(
              Buffer.toArray(noteToUnshare.sharedAccess),
              func(access : SharedNoteAccess) : Bool {
                access.sharedWith != sharedWith;
              },
            );

            noteToUnshare.sharedAccess := Buffer.fromArray<SharedNoteAccess>(updatedSharedAccess);

            removeNoteFromBuffer(sharedWith, noteId, ?msg.caller);
          };
        };
      };
    };
  };
};
