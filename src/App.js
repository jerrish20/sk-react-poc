import {
    DateRangeFacet,
    MultiMatchQuery,
    CompletionSuggester,
    RangeFacet,
    RefinementSelectFacet,
    Filter
} from "@searchkit/sdk";
import {
    FacetsList,
    SearchBar,
    ResetSearchButton,
    SelectedFilters,
    Pagination
} from "@searchkit/elastic-ui";
import {useSearchkitVariables} from "@searchkit/client";
import {useSearchkitSDK} from "@searchkit/sdk/lib/esm/react-hooks";
import {
    EuiPage,
    EuiFlexGrid,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiPageSideBar,
    EuiTitle,
    EuiHorizontalRule,
    EuiText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPanel,
    EuiCheckbox,
} from "@elastic/eui";

import BatchFilter from "./components/batch/filter";
import {BatchInput, ValueFilter as BatchValueFilter} from "./components/batch/component";

import IngestionFilter from "./components/ingestion/filter";
import {IngestionInput, ValueFilter as IngestionValueFilter} from "./components/ingestion/component";

import "@elastic/eui/dist/eui_theme_light.css";

const customFilterComponents = {
    "IngestionFilter": IngestionValueFilter,
    "BatchFilter": BatchValueFilter
};

const config = {
    host: "https://vpc-fs-dev-search-es-6il5jwg3fj3torp3ibfctacw5e.eu-west-1.es.amazonaws.com:443",
    index: "shared_search_data",
    hits: {
        fields: [
            "fundingBodyAwardId",
            "title",
            "synopsis",
            "ingestionId",
            "batchId",
            "startDate",
            "funderName",
            "fundingBodyCountry",
            "fundingDetail",
            "hasProvenance"
        ]
    },
    query: new MultiMatchQuery({
        fields: [
            "title",
            "fundingBodyCountry",
        ]
    }),
    suggestions: [
        new CompletionSuggester({
            identifier: 'funderName',
            field: 'funderName',
        })
    ],
    filters: [
        new IngestionFilter(),
        new BatchFilter(),
    ],
    facets: [
        new DateRangeFacet({
            field: "startDate",
            identifier: "startDate",
            label: "Start Date"
        }),
        new RefinementSelectFacet({
            field: "hasProvenance.wasAttributedTo.keyword",
            identifier: "wasAttributedTo",
            label: "Data Provider",
            multipleSelect: true
        }),
        new RefinementSelectFacet({
            field: "hasProvenance.status.keyword",
            identifier: "status",
            label: "Status",
            multipleSelect: true
        }),
    ]
}

const HitsList = ({data}) => (
    <EuiFlexGrid columns={1}>
        {data?.hits.items.map((hit) => (
            <EuiFlexItem key={hit.id}>
                <EuiFlexGroup gutterSize="xl">
                    <EuiFlexItem>
                        <EuiPanel>
                            <EuiFlexGroup>
                                <EuiFlexItem grow={false}>
                                    <EuiCheckbox />
                                </EuiFlexItem>
                                <EuiFlexItem grow={6}>
                                    <EuiTitle size="xs">
                                        <h6>{hit.fields.title[0]?.value}</h6>
                                    </EuiTitle>
                                    {/*<EuiText grow={false}>*/}
                                    {/*    <p>{hit.fields.synopsis[0]?.abstract?.value}</p>*/}
                                    {/*</EuiText>*/}
                                </EuiFlexItem>
                                {/*<EuiFlexItem grow={2}>*/}
                                {/*    <EuiText grow={false}>*/}
                                {/*        <ul>*/}
                                {/*            <li>*/}
                                {/*                {hit.fields.fundingDetail?.fundingTotal[0]?.amount} {hit.fields.fundingDetail?.fundingTotal[0]?.currency}*/}
                                {/*            </li>*/}
                                {/*        </ul>*/}
                                {/*    </EuiText>*/}
                                {/*</EuiFlexItem>*/}
                            </EuiFlexGroup>
                        </EuiPanel>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
        ))}
    </EuiFlexGrid>
);

function App() {
    const Facets = FacetsList([]);
    const variables = useSearchkitVariables();
    const {results, loading} = useSearchkitSDK(config, variables);
    return (
        <EuiPage>
            <EuiPageSideBar>
                <SearchBar loading={loading}/>
                <EuiHorizontalRule margin="m"/>
                <Facets data={results} loading={loading}/>
                <EuiHorizontalRule margin="m"/>
                <BatchInput/>
                <EuiHorizontalRule margin="m"/>
                <IngestionInput/>
            </EuiPageSideBar>
            <EuiPageBody component="div">
                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle size="l">
                            <SelectedFilters data={results} loading={loading}
                                             customFilterComponents={customFilterComponents}/>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                    <EuiPageHeaderSection>
                        <ResetSearchButton loading={loading}/>
                    </EuiPageHeaderSection>
                </EuiPageHeader>
                <EuiPageContent>
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiTitle size="s">
                                <h2>{results?.summary.total} Results</h2>
                            </EuiTitle>
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiPageContentBody>
                        <HitsList data={results}/>
                        <br/><br/>
                        <EuiFlexGroup justifyContent="spaceAround">
                            <Pagination data={results}/>
                        </EuiFlexGroup>
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    );
}

export default App;
