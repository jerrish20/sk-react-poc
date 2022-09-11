import {useSearchkit} from "@searchkit/client";
import {EuiButton, EuiFlexItem, EuiFieldSearch, EuiSuggest} from '@elastic/eui'
import React, {useState} from "react";

const FunderNameInput = () => {
    const api = useSearchkit();
    const [status, setStatus] = useState('unchanged');
    const [value, setValue] = useState('');

    const sampleItems = [
        {
            type: { iconType: 'search', color: 'tint4' },
            label: 'Saskatchewan Health Research Foundation',
        },
        {
            type: { iconType: 'search', color: 'tint4' },
            label: 'National Center for Immunization and Respiratory Diseases',
        },
    ];

    const onItemClick = (e) => {
        const funderName = e.label;
        api.removeFiltersByIdentifier('FunderNameFilter');
        setStatus('loading');
        if (funderName !== '') {
            setValue(funderName);
            api.toggleFilter({identifier: 'FunderNameFilter', value: `${funderName}`});
            api.search();
        } else {
            api.search();
        }
        setStatus('unchanged');
    };

    return (
        <div>
            <div><b>Funder</b></div>
            <br/>
            <EuiSuggest
                value={value}
                status={status}
                onInput={() => {
                }}
                onItemClick={onItemClick}
                suggestions={sampleItems}
                isClearable={true}
                placeholder="Type funder name..."/>
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

export {ValueFilter, FunderNameInput};