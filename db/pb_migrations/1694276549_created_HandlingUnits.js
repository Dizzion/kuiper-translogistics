/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "q308pqkr5uoicf3",
    "created": "2023-09-09 16:22:29.773Z",
    "updated": "2023-09-09 16:22:29.773Z",
    "name": "HandlingUnits",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pij3izny",
        "name": "HU",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "0h7ijpav",
        "name": "StagedTime",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "ahopnsxs",
        "name": "Alias",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("q308pqkr5uoicf3");

  return dao.deleteCollection(collection);
})
