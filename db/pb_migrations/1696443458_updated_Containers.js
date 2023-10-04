/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fr4fi59icmto4j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zsq795zo",
    "name": "Hold",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fr4fi59icmto4j")

  // remove
  collection.schema.removeField("zsq795zo")

  return dao.saveCollection(collection)
})
