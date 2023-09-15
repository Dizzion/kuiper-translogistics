/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hyafqw4mo552v72")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nyadtkxj",
    "name": "Containers",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0fr4fi59icmto4j",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hyafqw4mo552v72")

  // remove
  collection.schema.removeField("nyadtkxj")

  return dao.saveCollection(collection)
})
