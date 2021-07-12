import * as React from "react";
import Box from "@awsui/components-react/box";
import SpaceBetween from "@awsui/components-react/space-between";
import Container from "@awsui/components-react/container";
import Header from "@awsui/components-react/header";
import ColumnLayout from "@awsui/components-react/column-layout";
import Link from "@awsui/components-react/link";

export default () => {

    return (
        <SpaceBetween>
            <Box variant="h1">
                Dashboard
            </Box>
            <Container
                header={
                    <Header variant="h2" description="Resource count">
                        Service overview
                    </Header>
                }
            >
            <ColumnLayout columns="4">
                <div>
                    <Box>Authors</Box>
                    <Link fontSize="display-l" href="#">12</Link>
                </div>
                <div>
                    <Box>Books</Box>
                    <Link fontSize="display-l" href="#">136</Link>
                </div>
                <div>
                    <Box>Publishers</Box>
                    <Link fontSize="display-l" href="#">5</Link>
                </div>
                <div>
                    <Box>Readers</Box>
                    <Link fontSize="display-l" href="#">28</Link>
                </div>

            
            </ColumnLayout>
            </Container>
        </SpaceBetween>
    )
}