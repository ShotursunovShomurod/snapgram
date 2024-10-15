import { api } from "./index";

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: (params) => ({
                url: "/api/auth",
                params,
            }),
            providesTags: ["User"],
        }),
        signIn: build.mutation({
            query: (body) => ({
                url: "/api/auth/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        registerUser: build.mutation({
            query: (body) => ({
                url: "/api/auth/register",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetUsersQuery, useRegisterUserMutation, useSignInMutation } =
    userApi;
