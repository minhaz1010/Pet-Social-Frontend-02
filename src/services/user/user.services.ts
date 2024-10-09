"use server"
import axiosInstance from "@/lib/axios/axiosInstance"


export const detailsOfAUser = async () =>{
  const response  = await axiosInstance.get("/users/me");
  return response.data;
}