import {useSearchkit} from "@searchkit/client";
import {EuiButton, EuiFlexItem, EuiFieldSearch} from '@elastic/eui'
import React from "react";

const IngestionInput = () => {
    const api = useSearchkit();

    const onChange = (e) => {
        const ingestId = e.target.value;
        if (ingestId !== '') {
            api.toggleFilter({identifier: 'IngestionFilter', value: `${e.target.value}`});
            api.search();
        } else {
            api.removeFiltersByIdentifier('IngestionFilter');
            api.search();
        }
    };

    return (
        <div>
            <div><b>Ingestion Id</b></div>
            <br/>
            <EuiFieldSearch onChange={onChange} placeholder="Type ingestion Id"/>
        </div>
    );
};

const ValueFilter = ({filter, loading}) => {
    const api = useSearchkit();

    return (
        <EuiFlexItem grow={false}>
            <EuiButton
                iconSide="right"
                iconType="cross"
                isLoading={loading}
                onClick={() => {
                    api.removeFilter(filter)
                    api.search()
                }}
            >
                {filter.label}: {filter.value}
            </EuiButton>
        </EuiFlexItem>
    )
}

export {ValueFilter, IngestionInput};