import { jetbrains } from "@/config/font";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { FC, useState } from "react";
import { IPost } from "@/types";
import { Crown, MessageCircle, Share2, ThumbsDown, ThumbsUp, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from 'rc-image';
import 'rc-image/assets/index.css';
import { Button } from "../ui/button";
import { useLikeAPost } from "@/hooks/useLikeAPost";
import { useDislikeAPost } from "@/hooks/useDislikeAPost.hook";
import { useAuth } from "@clerk/nextjs";
import { Input } from "../ui/input";
import { useCreateComment } from "@/hooks/useCreateComment.hook";
import { toast } from "sonner";

export const PostCard: FC<{ post: IPost }> = ({ post }) => {
  const { mutate: handleLikeAPost } = useLikeAPost();
  const { mutate: handleDislikeAPost } = useDislikeAPost();
  const { mutate: handleComment, isPending } = useCreateComment()
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  const { userId } = useAuth();

  const handleLike = async (postId: string) => {
    handleLikeAPost(postId);
  }
  const handleDislike = async (postId: string) => {
    handleDislikeAPost(postId);
  }

  const handleCommentSubmit = (postId: string) => {
    const payload = {
      postId: postId,
      content: comment
    }
    handleComment(payload);
    // toast.success("Comment Added Successfully")
    setComment("");
    setShowCommentInput(false);
  };

  return (
    <Card className={`mb-4 relative border-0 bg-gradient-to-b from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg shadow-black/20 ${jetbrains.className}`}>
      {/* Premium/Free Badge */}
      <div className="absolute top-2 right-2 z-10">
        {post.isPremium ? (
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full flex items-center shadow-lg">
            <Crown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="text-xs sm:text-sm font-medium">Premium</span>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full flex items-center shadow-lg">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="text-xs sm:text-sm font-medium">Free</span>
          </div>
        )}
      </div>

      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 border-b border-gray-700/50 p-3 sm:p-4">
        <Avatar className="border-2 w-12 h-12 sm:w-14 sm:h-14 border-teal-500">
          <AvatarImage src={post.author.imageURL} alt={post.author.userName} />
          <AvatarFallback className="bg-teal-500 text-white">{post.author.userName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-100 text-base sm:text-lg">{post.author.userName}</h3>
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <span className="text-teal-500">{post.petType}</span>
            <span className="text-teal-500">{post.postType}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-gray-200 p-3 sm:p-4">
        <h4 className="font-bold mb-2 text-white text-lg sm:text-xl">{post.title}</h4>
        {post.image.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {post.image.map((img, index) => (
              <div key={img.public_id} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={img.secure_url}
                  alt={`Post image ${index + 1}`}
                  className="rounded-lg object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  preview={{
                    mask: (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white backdrop-blur-sm">
                        <span className="bg-teal-500/80 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-base font-medium">
                          Click to view
                        </span>
                      </div>
                    ),
                    toolbarRender: () => null,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap justify-between border-t border-gray-700/50 p-2 sm:p-3">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          {/* Like Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`text-sky-300 hover:text-sky-200 hover:bg-sky-500/20 ${!userId ? 'cursor-not-allowed opacity-50' : ''} text-xs sm:text-sm`}
            onClick={() => handleLike(post._id)}
            title={!userId ? 'Please login' : ''}
          >
            <ThumbsUp className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {post.likes}
          </Button>

          {/* Dislike Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`text-sky-300 hover:text-sky-200 hover:bg-sky-500/20 ${!userId ? 'cursor-not-allowed opacity-50' : ''} text-xs sm:text-sm`}
            onClick={() => handleDislike(post._id)}
            title={!userId ? 'Please login' : ''}
          >
            <ThumbsDown className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {post.dislikes}
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCommentInput(!showCommentInput)}
            className={`text-sky-300 hover:text-sky-200 hover:bg-sky-500/20 ${!userId ? 'cursor-not-allowed opacity-50' : ''} text-xs sm:text-sm`}
            title={!userId ? 'Please login' : ''}
          >
            <MessageCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Comment</span>
          </Button>

          {/* Share Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`text-sky-300 hover:text-sky-200 hover:bg-sky-500/20 ${!userId ? 'cursor-not-allowed opacity-50' : ''} text-xs sm:text-sm`}
            title={!userId ? 'Please login' : ''}
          >
            <Share2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
        {showCommentInput && (
          <div className="w-full mt-2 flex">
            <Input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-grow mr-2 text-white"
            />
            <Button
              onClick={() => handleCommentSubmit(post._id)}
              disabled={!comment.trim()}
              size="sm"
            >
              Submit
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};