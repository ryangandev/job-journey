import React from "react";

import Loader from "../../../components/loader";

export default function Loading() {
    return (
        <Loader
            label="Loading interview prep questions..."
            showWrapper={false}
        />
    );
}
