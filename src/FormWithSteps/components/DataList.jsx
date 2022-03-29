import React, {useMemo, useCallback } from "react";
import DataListInput from "react-datalist-input";
import '../assets/styles/DataList.css'

const DataList = ({myValues, getValue}) => {
    /**
     * your callback function gets called if the user selects one option out of the drop down menu
     * @param selectedItem object (the selected item / option)
     */
    const onSelect = useCallback((selectedItem) => {
        getValue(selectedItem)
    }, [getValue]);

    // the array you want to pass to the react-data-list component
    // key and label are required properties
    const items = useMemo(
        () =>
            myValues.map((oneItem, index) => ({
                // required: what to show to the user
                label: oneItem.name,
                // required: key to identify the item within the array
                key: index,
                // feel free to add your own app logic to access those properties in the onSelect function
                ...oneItem
            })),
        [myValues]
    );

    return (
        <DataListInput
            placeholder="Выберать из списка"
            items={items}
            onSelect={onSelect}
        />
    );
};

export default DataList