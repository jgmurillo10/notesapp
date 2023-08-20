/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const collection = new Collection({
      id: 'b20qrnx2uzq1xdg',
      created: '2023-08-10 20:02:06.853Z',
      updated: '2023-08-10 20:02:06.853Z',
      name: 'assistants',
      type: 'base',
      system: false,
      schema: [
        {
          system: false,
          id: 'okw4unea',
          name: 'name',
          type: 'text',
          required: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: '',
          },
        },
        {
          system: false,
          id: 'iejxqqwr',
          name: 'description',
          type: 'text',
          required: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: '',
          },
        },
      ],
      indexes: [],
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('b20qrnx2uzq1xdg');

    return dao.deleteCollection(collection);
  },
);
