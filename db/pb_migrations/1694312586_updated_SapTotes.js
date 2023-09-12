/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bn82iljo9z5efdw")

  // remove
  collection.schema.removeField("0rmhtxvh")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bn82iljo9z5efdw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0rmhtxvh",
    "name": "Tote_id",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
