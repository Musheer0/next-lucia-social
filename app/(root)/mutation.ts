import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query"
import { CreatePost } from "../../components/post/editor/action"
import { useToast } from "@/components/ui/use-toast"
import { PostsPage } from "@/lib/type"

export const useSubmitPostMutation = ()=>{
    const {toast}= useToast()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:CreatePost,
        onSuccess:(newPost)=>{
            const queryFilter :QueryFilters = {   queryKey: ['fyp', 'get-posts']};
            queryClient.cancelQueries(queryFilter);
            queryClient.setQueriesData<InfiniteData<PostsPage, string|null>>(
                queryFilter,
                //@ts-ignore
                (oldData)=>{
                 const  firstPage = oldData?.pages[0];
                 if(firstPage){
                    return {
                        pageParams: oldData.pageParams,
                        pages:[
                            {
                                posts:[newPost, ...firstPage.posts],
                                nextCursor: firstPage.nextCursor
                            },
                            ...oldData.pages.slice(1)
                        ]
                    }
                 }       
                 queryClient.invalidateQueries({
                    queryKey: queryFilter.queryKey,
                    predicate(query){
                        return !query.state.data;
                    }
                 })
                }
            )
        },
        onError:(er)=>{
            console.log(er);
            toast({
                title: 'Error Creating Post',
                description: er.message,
                variant: 'destructive'
            })
        }
    })
}