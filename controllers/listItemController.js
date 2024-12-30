const listItemService = require("../services/ListItemService");

class ListItemController {

    async generateItems(req, res, next) {
        const data = await listItemService.generateItems(req, res, next);
        if (data) {
            res.status(data.statusCode).json(data);
        }
    }
}

module.exports = ListItemController;