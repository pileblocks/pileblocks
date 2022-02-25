pragma ton-solidity >= 0.47.0;

contract ConB {

    struct Sortable {
        uint16 value;
        int64 created;
    }

    function sortItems () public pure returns (uint8[]) {
        mapping(Sortable => uint8) items;

        items[Sortable(9, -1)] = 4;
        items[Sortable(1, -10)] = 1;
        items[Sortable(3, -5)] = 3;
        items[Sortable(1, -20)] = 2;
        items[Sortable(1, -5)] = 5;

        optional(Sortable, uint8) item = items.max();
        bool success;
        uint8[] arr;
        success = item.hasValue();
        while (success) {
            (Sortable s, uint8 id) = item.get();
            arr.push(id);
            item = items.prev(s);
            success = item.hasValue();
        }
        return arr;
    }
}
