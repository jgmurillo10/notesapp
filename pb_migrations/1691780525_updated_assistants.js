/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b20qrnx2uzq1xdg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "or6qccs0",
    "name": "gpt_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b20qrnx2uzq1xdg")

  // remove
  collection.schema.removeField("or6qccs0")

  return dao.saveCollection(collection)
})
