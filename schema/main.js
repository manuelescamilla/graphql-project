const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const roll = () => Math.floor(6 * Math.random()) + 1;

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world'
    },
    diceRoll: {
        type: new GraphQLList(GraphQLInt),
        args: {
          count: { 
              type: GraphQLInt,
              defaultValue: 2
          }
        },
        resolve: (_, args) => { // We named the first argument for resolve() with an underscore because we're not using it for this example. This argument represents the parent object and it's undefined on the first root-level queries. 
        let rolls = [];
            for (let i = 0; i < args.count; i++) {
                rolls.push(roll());
            }
        return rolls;
        }
    },
    usersCount: {
        type: GraphQLInt,
            resolve: (_, args, { db }) =>
        db.collection('users').count()
    }
}
});

const mySchema = new GraphQLSchema({
    query: queryType
});

module.exports = mySchema;