import { render } from '@testing-library/react';
import Breadcrumb from "../Breadcrumb";
import {BrowserRouter} from "react-router-dom";

describe("Breadcrumb", () => {
    it("Check render correctly ErrorPage contents", () => {
        var breadCrumb = [{ name: "Timeline", url: "/timeline/00000000000000000000000000000000" }, { name: "News Page" }];

        const { queryByText, getAllByRole } = render(
            <BrowserRouter>
              <Breadcrumb bread={breadCrumb}/>
            </BrowserRouter>
        );

        // Check all the Breadcrumb text correctly rendered
        for(let bread of breadCrumb){
            expect(queryByText(bread.name)).toBeDefined();
        }


        // Check all the SearchBar's links correctly rendered
        const links = getAllByRole("link");
        const homeLink = links[0];
        expect(homeLink.href).toEqual('http://localhost/');
        const TimelineLink = links[1];
        expect(TimelineLink.href).toEqual('http://localhost/timeline/00000000000000000000000000000000');

    });
});
