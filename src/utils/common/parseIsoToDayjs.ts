import dayjs, { Dayjs } from 'dayjs';

export function parseIsoToDayjs(value?: string | null): Dayjs | null {
    if (!value) return null;

    const parsed = dayjs(value);
    return parsed.isValid() ? parsed : null;
}