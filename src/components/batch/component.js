import {useSearchkit} from "@searchkit/client";
import {EuiButton, EuiFlexItem, EuiFieldSearch} from '@elastic/eui'
import React from "react";

const BatchInput = () => {
    const api = useSearchkit();

    const onChange = (e) => {
        const ingestId = e.target.value;
        api.removeFiltersByIdentifier('BatchFilter');
        if (ingestId !== '') {
            api.toggleFilter({identifier: 'BatchFilter', value: `${e.target.value}`});
            api.search();
        } else {
            api.search();
        }
    };

    return (
        <div>
            <div><b>Batch Id</b></div>
            <br/>
            <EuiFieldSearch onChange={onChange} placeholder="Type batch Id"/>
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

export {ValueFilter, BatchInput};