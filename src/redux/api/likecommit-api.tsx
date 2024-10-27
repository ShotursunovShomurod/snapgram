import { api } from "./index";

export const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        toggleLike: build.mutation({
            query: (id) => ({
                url: `api/post/${id}/like`,
                method: "POST",
            }),
            invalidatesTags: ["Posts"],
        }),
        postComment: build.mutation({
            query: ({ id, body }) => ({
                url: `api/comment/${id}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Posts"],
        }),
    }),
});

export const { useToggleLikeMutation, usePostCommentMutation } = productApi;
