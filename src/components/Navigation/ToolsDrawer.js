import * as React from "react";
import HelpPanel from "@awsui/components-react/help-panel";

export default () => {

    return (

        <HelpPanel

            header={<h2>About AWS UI App</h2>}

        >
            <div>
                <p>
                    AWS UI App is an example application that demonstrates the use of basic components from the <b>AWS UI Design System</b>
                </p>
                <h3>
                    Components used
                </h3>
                <ul>
                    <li>
                        <a href="https://github.com/aws/awsui-documentation/blob/main/components/app-layout.md" >AppLayout </a>
                    </li>
                    <li>
                        SideNavigation
                    </li>
                    <li>
                        HelpPanel
                    </li>
                    <li>
                        Form
                    </li>
                    <li>
                        Table
                    </li>
                </ul>
                <h4>Hooks used</h4>
                <ul>
                    <li>useState</li>
                    <li>useEffect</li>
                    <li>useCollection from AWS UI</li>
                    <li>useParams from React Router</li>

                </ul>
            </div>

        </HelpPanel>
    )


}

