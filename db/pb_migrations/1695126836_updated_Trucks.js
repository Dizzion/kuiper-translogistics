/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hyafqw4mo552v72")

  // remove
  collection.schema.removeField("ym2xz2cd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gr82ajal",
    "name": "DepartureTime",
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
  const collection = dao.findCollectionByNameOrId("hyafqw4mo552v72")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ym2xz2cd",
    "name": "DepartureTime",
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

  // remove
  collection.schema.removeField("gr82ajal")

  return dao.saveCollection(collection)
})
