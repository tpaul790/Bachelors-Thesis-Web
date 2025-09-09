import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../utils/constants.ts";
import {isExpired} from "../utils/functions/token.ts";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: headers => {
            const token = localStorage.getItem("token");
            if (token && !isExpired()) {
                headers.set("app-auth", token);
            }
            headers.set("content-type", "application/json");
            return headers;
        },
        credentials: "include"
    }),
    endpoints: () => ({}),
    tagTypes: [
        "users",
        "members",
        "projects",
        "teams",
        "teams_summary",
    ]
});