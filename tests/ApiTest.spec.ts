import { test, expect } from '@playwright/test';
import { z } from "zod";

const BASE_URL = 'https://petstore.swagger.io/v2';

//Schema for Get
const UserSchema = z.object({
   userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

//schema for post and put
const Create_updateUserSchema = z.object({
   code: z.number(),
  type: z.string(),
  message: z.string()
});

test.describe('Api Test for user module',()=>{
   
test ("get users", async ({request}) => {
   const response = await request.get('https://jsonplaceholder.typicode.com/todos/1');
   expect (response.status()).toBe(200);
   const body = await response.json();
   console.log("get response :", body);
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("title");
    const result = UserSchema.safeParse(body);
    expect (result.success).toBe(true);
});

test("Create users", async ({ request }) => {
  const response = await request.post(`${BASE_URL}/user/createWithList`, {
    data: {
     "id": 0,
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "userStatus": 0
    },
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Api-Key": "users"
    }
  });

  console.log(await response.text());
  expect(response.status());
  const result = Create_updateUserSchema.safeParse(await response.json());
   expect(result.success).toBe(true);
});


test("update users",async({request})=>{
  const response = await request.put(`${BASE_URL}/user/kajal`,{
    data:{
      "username": "kajal",
    "firstName": "kajal",
    "lastName": "taank",
    "email": "string1.com",
    "password": "string123",
    "phone": "9728889197"
     
      }
  });
  console.log (await response.text());
  expect (response.status()).toBe (200);
  const result = Create_updateUserSchema.safeParse(await response.json());
  expect (result.success).toBe (true);

   });
})
