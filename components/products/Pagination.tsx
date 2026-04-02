'use client'

import { useRouter, useSearchParams } from 'next/navigation';

type CursorMeta = {
    has_next?: boolean;
    has_prev?: boolean;
    next_cursor?: string | null;
    prev_cursor?: string | null;
};

export default function Pagination({ meta }: { meta: CursorMeta }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pushWithCursors = (next: { cursor?: string; before?: string }) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('cursor');
        params.delete('before');
        if (next.cursor) params.set('cursor', next.cursor);
        if (next.before) params.set('before', next.before);
        router.push(`?${params.toString()}`);
    };

    const hasPrev = Boolean(meta.has_prev && meta.prev_cursor);
    const hasNext = Boolean(meta.has_next && meta.next_cursor);

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            <button
                type="button"
                onClick={() => hasPrev && meta.prev_cursor && pushWithCursors({ before: meta.prev_cursor })}
                disabled={!hasPrev}
                className="px-4 py-2 border rounded-md disabled:opacity-30"
            >
                Prev
            </button>
            <button
                type="button"
                onClick={() => hasNext && meta.next_cursor && pushWithCursors({ cursor: meta.next_cursor })}
                disabled={!hasNext}
                className="px-4 py-2 border rounded-md disabled:opacity-30"
            >
                Next
            </button>
        </div>
    );
}
