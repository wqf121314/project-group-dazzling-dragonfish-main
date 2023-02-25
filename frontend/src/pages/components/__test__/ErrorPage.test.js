import { render } from '@testing-library/react';
import ErrorPage from "../ErrorPage";

describe("ErrorPage", () => {
    it("Check render correctly ErrorPage contents", () => {

        let breadCrumb = [{name:""}]

        const { queryByText, getAllByRole } = render(
            <ErrorPage bread={breadCrumb} />
        );

        // Check all the ErrorPage text correctly rendered
        expect(queryByText("Back Home")).toBeDefined();

        // Check all the ErrorPage's links correctly rendered
        const links = getAllByRole("link");
        const homeLink = links[0];
        expect(homeLink.href).toEqual('http://localhost/');

    });
});
