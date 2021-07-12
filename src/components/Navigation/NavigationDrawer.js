import * as React from "react";
import SideNavigation from "@awsui/components-react/side-navigation";
import { useHistory } from 'react-router-dom';

export default () => {

    const [activeHref, setActiveHref] = React.useState("/");
    const history = useHistory();


    return (
        <SideNavigation
            activeHref={activeHref}
            header={{ text: "AWS UI App" }}
            items={[
                { type: "link", text: "Dashboard", href: "/" },
                {
                    type: "section",
                    text: "Resources",
                    items: [
                        { type: "link", text: "Authors", href: "/authors" },
                        { type: "link", text: "Books", href: "/books" },

                    ]
                },
                {
                    type: "section",
                    text: "AWS Design System",
                    items: [
                        { type: "link", text: "React", href: "https://reactjs.org/", external: true },
                        { type: "link", text: "AWS UI", href: "https://github.com/aws/awsui-documentation", external: true },

                    ]
                }
            ]}
            onFollow={event => {
                if (!event.detail.external) {
                event.preventDefault();
                setActiveHref(event.detail.href);
                history.push(event.detail.href)
            }
            }}
        />

    );
}