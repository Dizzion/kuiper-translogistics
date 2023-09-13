/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t5xotj4dq52ndsy")

  // remove
  collection.schema.removeField("uyhifsvy")

  // remove
  collection.schema.removeField("wgl9mtoo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fds31483",
    "name": "full_name",
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
    "id": "xxktyz9n",
    "name": "default_location",
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
    "id": "uyhifsvy",
    "name": "full_name",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "hgi80gxslxy1wp4",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wgl9mtoo",
    "name": "default_location",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "hgi80gxslxy1wp4",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("fds31483")

  // remove
  collection.schema.removeField("xxktyz9n")

  return dao.saveCollection(collection)
})
