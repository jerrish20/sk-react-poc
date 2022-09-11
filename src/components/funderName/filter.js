class FunderNameFilter {
    excludeOwnFilters = false

    constructor() {
    }

    getIdentifier() {
        return "FunderNameFilter"
    }

    getFilters(filters) {
        return {
            "bool": {
                "must": filters.map((filter) => {
                    return {"match": {"funderName.keyword": filter.value}}
                })
            }
        }
    }

    getSelectedFilter(filterSet) {
        return {
            type: 'ValueSelectedFilter',
            id: `${this.getIdentifier()}_${filterSet.value}`,
            identifier: this.getIdentifier(),
            label: "Funder Name",
            value: filterSet.value,
            display: "FunderNameFilter"
        }
    }
}


export default FunderNameFilter;