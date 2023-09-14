/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q308pqkr5uoicf3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxeuxt9v",
    "name": "ToQI",
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
  const collection = dao.findCollectionByNameOrId("q308pqkr5uoicf3")

  // remove
  collection.schema.removeField("zxeuxt9v")

  return dao.saveCollection(collection)
})
