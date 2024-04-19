import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { Button } from "./button"
import { useSubmitForm } from "../api";

const schema = z.object({
      name: z.string({
          required_error: "Name is required",
      })
      .refine((value) => /^[a-zA-Z]{1,30}$/.test(value), {
          message: "Name can only contain alphabets, at max 30 characters"
        }),
      gender: z.string({
          required_error: "Gender is required",
        }).refine((value) => (value === 'male' || value === 'female'), {
          message: 'Gender can only be male or female'
        }),
      duration: z.string({
          required_error: "Duration is required",
        }).refine((value) => /^[0-9]+$/.test(value), {
          message: 'Duration has to be numeric value'         
        }).refine((value) => parseInt(value) <= 24, {
          message: "Duration cannot be greater then 24 hours"
        }),
    });
  
type FormFields = z.infer<typeof schema>;

export const Form = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        mode: "onBlur",
        resolver: zodResolver(schema),
      });
    
    const { mutateAsync: submitLogMutation } = useSubmitForm();
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
          await submitLogMutation(data)
        } catch (error) {
          setError("root", {
            message: "error.message",
          });
        }
      };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                        {...register('name')}
                        type="text"
                        placeholder="Name"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {errors.name && (
                            <div className="text-red-500">{errors.name.message}</div>)}
                    </div>
                </div>
                {/* Gender */}
                <div className="mb-4">
                    <label htmlFor="gender" className="mb-2 block text-sm font-medium">
                    Gender
                    </label>
                    <div className="relative">
                    <select
                        {...register('gender')}
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    >
                        <option value="">
                        Select gender
                        </option>
                        <option value='male'>
                            Male
                        </option>
                        <option value='female'>
                            Female
                        </option>
                        </select>
                        {errors.gender && (
                            <div className="text-red-500">{errors.gender.message}</div>)}
                    </div>
                </div>
  
                {/* Sleep Duration */}
                <div className="mb-4">
                    <label htmlFor="duration" className="mb-2 block text-sm font-medium">
                    Sleep Duration
                    </label>
                    <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                        {...register('duration')}
                        type="text"
                        placeholder="Sleep Duration"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        </div>
                        {errors.duration && (
                            <div className="text-red-500">{errors.duration.message}</div>)}
                    </div>
                </div>
            {errors.root && <div className="text-red-500 flex justify-center">{errors.root.message}</div>}
            </div>
        <div className="mt-6 flex justify-center gap-4">
          <Button disabled={isSubmitting} type="submit">Submit</Button>
        </div>
      </form>
  )
}
