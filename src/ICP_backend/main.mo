import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";

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

  type Note = {
    id : Nat;
    owner : Principal;
    var title : Text;
    var content : Text;
    var category : SharedCategory;
  };

  type SharedNote = {
    id : Nat;
    owner : Principal;
    title : Text;
    content : Text;
    category : SharedCategory;
  };

  var noteId : Nat = 0;
  var categoryId : Nat = 0;

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

  private func noteEqual(a : Note, b : Note) : Bool {
    a.id == b.id;
  };

  private func categoryEqual(a : Category, b : Category) : Bool {
    a.id == b.id;
  };

  private func noteToSharedNote(note : Note) : SharedNote {
    {
      id = note.id;
      owner = note.owner;
      title = note.title;
      content = note.content;
      category = note.category;
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

  // Create
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
        categoryRecord.put(msg.caller, categoryBuffer);
      };
    };
  };

  public shared (msg) func createNote(title : Text, content : Text, category : SharedCategory) : async () {
    let note : Note = {
      id = noteId;
      owner = msg.caller;
      var title = title;
      var content = content;
      var category = category;
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

  public shared query (msg) func getCategories() : async [SharedCategory] {
    let categories : ?Buffer.Buffer<Category> = categoryRecord.get(msg.caller);

    switch (categories) {
      case (null) {
        return [];
      };
      case (?categoryBuffer) {
        return Buffer.toArray(Buffer.map<Category, SharedCategory>(categoryBuffer, categoryToSharedCategory));
      };
    };
  };

  // public shared query (msg) func getNote(id : Nat) : async ?SharedNote {
  //   let notes : ?Buffer.Buffer<Note> = notesRecord.get(msg.caller);

  //   switch (notes) {
  //     case (null) {
  //       return null;
  //     };
  //     case (?noteBuffer) {
  //       for (note in noteBuffer.vals()) {
  //         if (note.id == id) {
  //           assert note.owner == msg.caller;
  //           return ?noteToSharedNote(note);
  //         };
  //       };
  //       return null;
  //     };
  //   };
  // };

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
  public shared (msg) func updateNote(id : Nat, title : Text, content : Text, category : SharedCategory) : async () {
    let note : ?Note = getInternalNote(msg.caller, id);

    switch (note) {
      case (null) {
        return;
      };
      case (?noteToUpdate) {
        noteToUpdate.title := title;
        noteToUpdate.content := content;
        noteToUpdate.category := category;
      };
    };
  };

  public shared (msg) func updateCategory(id : Nat, name : Text, color : Text) : async () {
    let categories : ?Buffer.Buffer<Category> = categoryRecord.get(msg.caller);

    switch (categories) {
      case (null) {
        return;
      };
      case (?categoryBuffer) {
        for (category in categoryBuffer.vals()) {
          if (category.id == id) {
            assert category.owner == msg.caller;
            category.name := name;
            category.color := color;
            return;
          };
        };
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

  public shared (msg) func deleteCategory(id : Nat) : async () {
    let categories : ?Buffer.Buffer<Category> = categoryRecord.get(msg.caller);

    switch (categories) {
      case (null) {};
      case (?categoryBuffer) {
        let index = Buffer.indexOf<Category>({ id = id; owner = msg.caller; var name = ""; var color = "" }, categoryBuffer, categoryEqual);
        switch (index) {
          case (null) {};
          case (?i) {
            let removedCategory = categoryBuffer.remove(i);
            assert removedCategory.owner == msg.caller;
          };
        };
      };
    };
  };
};
