/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fr4fi59icmto4j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mzfqkpku",
    "name": "UnloadFinish",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fr4fi59icmto4j")

  // remove
  collection.schema.removeField("mzfqkpku")

  return dao.saveCollection(collection)
})
