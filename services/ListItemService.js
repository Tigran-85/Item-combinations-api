const generateCombinations = require('../helpers/generateCombinations');
const db = require('../db/dbConfig');
const {
    truncateItems,
    insertItem,
    insertResponse,
    truncateCombinations, insertCombination
} = require('../db/queries');
const BaseService = require("./BaseService");
const {ERROR_MESSAGES} = require("../common/validationMessage");

class ListItemService extends BaseService {
    async generateItems(req, res, next) {
        const { items, length } = req.body;

        if (!Array.isArray(items) || typeof length !== 'number') {
            return this.response({
                statusCode: 400,
                message: ERROR_MESSAGES.INVALID_INPUT_FORMAT
            })
        }

        const itemMap = {};
        const transformedItems = items.map((type, i) => {
            const prefix = String.fromCharCode(65 + i);
            if (!itemMap[type]) itemMap[type] = 1;
            return `${prefix}${itemMap[type]++}`;
        });

        // Generate valid combinations
        const combinations = generateCombinations(transformedItems, length);

        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Insert items into the database
            await connection.query(truncateItems);
            for (const item of transformedItems) {
                await connection.query(insertItem, [item]);
            }

            // Insert combinations into the database
            await connection.query(truncateCombinations);
            const combinationInsertPromises = combinations.map(combo =>
                connection.query(insertCombination, [combo.join(',')])
            );
            await Promise.all(combinationInsertPromises);

            // Save the request and response in the responses table
            const [responseInsertResult] = await connection.query(
                insertResponse,
                [JSON.stringify(req.body), JSON.stringify({ combination: combinations })]
            );

            const responseId = responseInsertResult.insertId;

            await connection.commit();

            const responseData = {
                id: responseId,
                combination: combinations,
            };
            return this.response({
                data: responseData,
            });
        } catch (error) {
            await connection.rollback();
            console.error(error);
            return this.response({
                statusCode: 500,
                message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            })
        } finally {
            connection.release();
        }
    }
}

module.exports = new ListItemService();
