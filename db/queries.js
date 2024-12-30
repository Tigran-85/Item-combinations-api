module.exports = {
    truncateItems: 'TRUNCATE TABLE items',
    insertItem: 'INSERT INTO items (item) VALUES (?)',
    truncateCombinations: 'TRUNCATE TABLE combinations',
    insertCombination: 'INSERT INTO combinations (combination) VALUES (?)',
    insertResponse: 'INSERT INTO responses (request_body, response_body) VALUES (?, ?)',
};
