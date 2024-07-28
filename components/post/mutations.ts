import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { deletepost } from "./actions";
import { useToast } from "../ui/use-toast";
import { PostsPage } from "@/lib/type";

export function useDeletePostMutation(){
    const {toast} = useToast();
    const QueryClient = useQueryClient();
    return useMutation({
        mutationFn:deletepost,
        onSuccess:async(postId)=>{
            if(postId==='') return ;
            const queryFilters:QueryFilters = {    queryKey: ['fyp', 'get-posts']};
            await QueryClient.cancelQueries();
            QueryClient.setQueriesData<InfiniteData<PostsPage , string| null>>(
                queryFilters,
                (oldData)=>{
                    if(!oldData) return ;
                    return {
                        pageParams: oldData.pageParams,
                        pages:oldData.pages.map((page)=>{
                            return {
                                nextCursor: page.nextCursor,
                                posts: page.posts.filter((post)=>post.id!==postId)
                            }
                        })
                    }
                }
            )
        },
        onError:()=>{
            toast({
                title: 'error deleting post',
                description:'refresh the page and try again'
            })
        }
    })
}