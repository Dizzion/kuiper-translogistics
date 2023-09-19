/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t5xotj4dq52ndsy")

  // remove
  collection.schema.removeField("y08oahga")

  // remove
  collection.schema.removeField("awngwhhj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3vfrkjdi",
    "name": "SAP",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ppdryep5",
    "name": "Freight",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t5xotj4dq52ndsy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y08oahga",
    "name": "SAP",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "awngwhhj",
    "name": "Freight",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("3vfrkjdi")

  // remove
  collection.schema.removeField("ppdryep5")

  return dao.saveCollection(collection)
})
