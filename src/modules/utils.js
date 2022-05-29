export function times(number, callback) {
    var results = [];
    while (number--) results.push(callback(number));
    return results;
}

export function sorted(collection, comparator) {
    var sortedItems = [...collection];
    sortedItems.sort(comparator);
    return sortedItems;
}
