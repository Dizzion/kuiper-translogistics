/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fr4fi59icmto4j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pgbeki2z",
    "name": "alias",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "e910ey6xgeiqdmh",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fr4fi59icmto4j")

  // remove
  collection.schema.removeField("pgbeki2z")

  return dao.saveCollection(collection)
})
