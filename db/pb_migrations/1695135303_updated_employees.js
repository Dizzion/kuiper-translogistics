/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hgi80gxslxy1wp4")

  collection.name = "Employees"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hgi80gxslxy1wp4")

  collection.name = "employees"

  return dao.saveCollection(collection)
})
