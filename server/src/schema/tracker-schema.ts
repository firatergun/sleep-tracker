import { TypeOf, object, string, z } from "zod";

const GenderTypeSchema = z.enum(["male", "female"])

export const submitDataSchema = object({
  body: object({
    name: string({
        required_error: "Name is required",
    })
    .refine((value) => /^[a-zA-Z]{1,30}$/.test(value), {
        message: "Name can only contain alphabets, at max 30 characters"
      }),
    gender: string({
        required_error: "Gender is required",
      }).refine((value) => (value === 'male' || value === 'female'), {
        message: 'Gender can only be male or female'
      }),
    duration: string({
        required_error: "Duration is required",
      }).refine((value) => /^[0-9]+$/.test(value), { // ^[0-9]{2}$
        message: 'Duration has to be numeric value'         
      }).refine((value) => parseInt(value) <= 24, {
        message: "Duration cannot be greater then 24 hours"
      }),
    }),
  });
  
  const params = {
    params: object({
      userId: string({
        required_error: "User Id is required",
      }).refine((value) => /^[0-9]+$/.test(value), { // ^[0-9]{2}$
        message: 'User Id has to be numeric value'         
      }),
    }),
  };

  export const userIdParamsSchema = object({
    ...params,
  });

  export type SubmitDataInput = TypeOf<typeof submitDataSchema>
  export type GenderType = TypeOf<typeof GenderTypeSchema>
  export type UserIdParams = TypeOf<typeof userIdParamsSchema>
    