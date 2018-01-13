const graphql = require('graphql');
const mongoose = require('mongoose');

const noteType = new graphql.GraphQLObjectType({
  name: 'note',
  fields: () => ({
    id: {
      type: graphql.GraphQLID,
    },
    title: {
      type: graphql.GraphQLString,
    },
    content: {
      type: graphql.GraphQLString,
    },
    date_updated: {
      type: graphql.GraphQLString,
    },
    category: {
      type: graphql.GraphQLString,
    },
  }),
});

const NOTE = mongoose.model('notes', {
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  category: String,
  date_updated: { type: Date, default: Date.now },
});

const notesAll = new graphql.GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    notes: {
      type: new graphql.GraphQLList(noteType),
      resolve: () =>
        new Promise((resolve, reject) => {
          // eslint-disable-next-line
          NOTE.find((err, notes) => {
            if (err) reject(err);
            else resolve(notes);
          });
        }),
    },
  }),
});

const MutationAdd = {
  type: noteType,
  description: 'add Note',
  args: {
    title: {
      name: 'title',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    content: {
      content: 'content',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    category: {
      category: 'category',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
  },
  resolve: (root, args) => {
    const newNote = new NOTE({
      title: args.title,
      content: args.content,
      category: args.category,
    });
    // eslint-disable-next-line
    newNote.id = newNote._id;
    return new Promise((resolve, reject) => {
      newNote.save(err => {
        if (err) reject(err);
        else resolve(newNote);
      });
    });
  },
};

const MutationDelete = {
  type: noteType,
  args: {
    id: {
      id: 'id',
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
    },
  },
  // eslint-disable-next-line
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      NOTE.findByIdAndRemove(args.id, err => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
};

const MutationUpdate = {
  type: noteType,
  args: {
    id: {
      id: 'id',
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
    },
    title: {
      title: 'title',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    content: {
      content: 'content',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    category: {
      category: 'category',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
  },
  resolve: (root, args) => {
    const updatedNote = {
      title: args.title,
      content: args.content,
      category: args.category,
    };
    return new Promise((resolve, reject) => {
      NOTE.findOneAndUpdate(
        { id: args.id },
        { $set: { ...updatedNote } },
        { upsert: true },
        err => {
          if (err) reject(err);
          else resolve();
        },
      );
    });
  },
};

const MutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd,
    delete: MutationDelete,
    update: MutationUpdate,
  },
});

module.exports = new graphql.GraphQLSchema({
  query: notesAll,
  mutation: MutationType,
});
