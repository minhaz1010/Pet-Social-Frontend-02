import { createComment } from "@/services/post/post.services"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreateCommentPayload {
  postId: string;
  content: string
}

export const useCreateComment = () => {
  return useMutation({
    mutationKey: ['CREATE_COMMENT'],
    mutationFn: async (payload: CreateCommentPayload) => await createComment(payload),
    onSuccess: () => {
      toast.success("Comment Added")
    }
  })
}