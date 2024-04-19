import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const URI = 'http://localhost:5002';

export type User = {
    id: number,
    name: string,
    gender: "male" | "female",
    sleepData: number
} 

const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(`${URI}/users`);  
    if (!res.ok) {
        throw new Error('Network Error');
    }
    return await res.json();
}

const submitForm = async (data: Record<string, unknown>) => {
    const res = await fetch(`${URI}/submit`, {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return await res.json();
}

export const fetchUserChartData = async (userId: string) => {
    const res = await fetch(`${URI}/users/${userId}`);
    if (!res.ok) {
        throw new Error('Network Error');
    }
    return await res.json();
}

export const useFetchUsers = () => {
    return useQuery({
        queryFn: () => fetchUsers(),
        queryKey: ['users'],
        staleTime: 1 * 1000,
    });
};

export const useFetchUserChartData = (userId: string) => {
    return useQuery({
        queryFn: () => fetchUserChartData(userId),
        queryKey: ['user-chart', userId],
        suspense: true,
    });
};

export const useSubmitForm = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: submitForm,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
          },
    })
}