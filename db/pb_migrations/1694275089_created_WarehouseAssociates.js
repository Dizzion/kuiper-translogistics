/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "e910ey6xgeiqdmh",
    "created": "2023-09-09 15:58:09.267Z",
    "updated": "2023-09-09 15:58:09.267Z",
    "name": "WarehouseAssociates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ip1jmh47",
        "name": "alias",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("e910ey6xgeiqdmh");

  return dao.deleteCollection(collection);
})
