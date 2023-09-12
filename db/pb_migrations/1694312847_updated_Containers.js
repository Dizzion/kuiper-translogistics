/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fr4fi59icmto4j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v6tousbo",
    "name": "ContainerID",
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
  const collection = dao.findCollectionByNameOrId("0fr4fi59icmto4j")

  // remove
  collection.schema.removeField("v6tousbo")

  return dao.saveCollection(collection)
})
