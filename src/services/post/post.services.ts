/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import axiosInstance from "@/lib/axios/axiosInstance"
import { IErrorResponse, IPost, ISuccessfulResponse } from "@/types"

export  const createPost = async (postData:any)=>{
  try {
    const response = await axiosInstance.post<ISuccessfulResponse<IPost>>("/posts/create-post",postData);
    if(response.data.success){
      return response.data.data
    }
    else {
      console.log('error creating post',response.data.message);
      return null
    }
  } catch (error:any) {
  
    if (error.response) {
      const errorData: IErrorResponse = error.response.data;
      console.error("Error creating post:", errorData.message, errorData.errorMessages);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return null; 
  }
  
}