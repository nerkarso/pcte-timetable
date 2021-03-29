import useSWR from 'swr';

export default function useLatestTimetable() {
  const { data, error } = useSWR('/api/timetables/latest');

  return {
    data,
    error,
    loading: !data && !error,
  };
}
