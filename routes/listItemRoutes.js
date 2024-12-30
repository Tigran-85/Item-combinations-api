const ListItemController = require("../controllers/listItemController");
const listItemController = new ListItemController();

const { Router } = require("express");
const router = Router();

router.post("/generate", listItemController.generateItems);

module.exports = router;