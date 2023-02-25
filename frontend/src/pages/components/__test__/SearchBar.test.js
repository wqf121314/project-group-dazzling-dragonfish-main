import { render } from '@testing-library/react';
import SearchBar from "../SearchBar";
import {BrowserRouter} from "react-router-dom";

describe("SearchBar", () => {
    it("Check render correctly SearchBar contents", () => {
        var data = {
            data:{hotWords:["a","b","c"]
            }};

        const { queryByText, getAllByRole } = render(
            <BrowserRouter>
                <SearchBar data={data}/>
            </BrowserRouter>
        );

        // Check all the SearchBar text correctly rendered
        for (let hotword of data.data.hotWords){
            expect(queryByText(hotword)).toBeDefined();
        }
    });
});
