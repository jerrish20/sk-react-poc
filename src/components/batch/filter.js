class BatchFilter {
    excludeOwnFilters = false

    constructor() {
    }

    getIdentifier() {
        return "BatchFilter"
    }

    getFilters(filters) {
        return {
            "bool": {
                "filter": filters.map((filter) => {
                    return {"term": {"batchId.keyword": filter.value}}
                })
            }
        }
    }

    getSelectedFilter(filterSet) {
        return {
            type: 'ValueSelectedFilter',
            id: `${this.getIdentifier()}_${filterSet.value}`,
            identifier: this.getIdentifier(),
            label: "Batch Id",
            value: filterSet.value,
            display: "BatchFilter"
        }
    }
}


export default BatchFilter;