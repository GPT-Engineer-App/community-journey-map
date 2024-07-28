import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### RetentionAudit24

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| created_at | timestamptz | string | true     |
| Q1         | text        | string | false    |

*/

export const useRetentionAudit24 = () => useQuery({
    queryKey: ['RetentionAudit24'],
    queryFn: () => fromSupabase(supabase.from('RetentionAudit24').select('*')),
});

export const useAddRetentionAudit24 = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAudit) => fromSupabase(supabase.from('RetentionAudit24').insert([newAudit])),
        onSuccess: () => {
            queryClient.invalidateQueries('RetentionAudit24');
        },
    });
};

export const useUpdateRetentionAudit24 = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('RetentionAudit24').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('RetentionAudit24');
        },
    });
};

export const useDeleteRetentionAudit24 = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('RetentionAudit24').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('RetentionAudit24');
        },
    });
};

export const useGetSingleRetentionAudit24 = (id) => useQuery({
    queryKey: ['RetentionAudit24', id],
    queryFn: () => fromSupabase(supabase.from('RetentionAudit24').select('*').eq('id', id).single()),
    enabled: !!id,
});