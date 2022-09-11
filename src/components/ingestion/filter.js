class IngestionFilter {
    excludeOwnFilters = false

    constructor() {
    }

    getIdentifier() {
        return "IngestionFilter"
    }

    getFilters(filters) {
        return {
            "bool": {
                "filter": filters.map((filter) => {
                    return {"term": {"ingestionId.keyword": filter.value}}
                })
            }
        }
    }

    getSelectedFilter(filterSet) {
        return {
            type: 'ValueSelectedFilter',
            id: `${this.getIdentifier()}_${filterSet.value}`,
            identifier: this.getIdentifier(),
            label: "Ingestion Id",
            value: filterSet.value,
            display: "IngestionFilter"
        }
    }
}


export default IngestionFilter;