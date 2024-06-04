import React from "react";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function ProfilePage() {
    return (
        <Card className="rounded">
            <CardHeader>About</CardHeader>
            <CardBody>123</CardBody>
            <Divider className="mx-4" orientation="horizontal" />
            <CardHeader>Social Profiles</CardHeader>
            <CardBody>123</CardBody>
        </Card>
    );
}
