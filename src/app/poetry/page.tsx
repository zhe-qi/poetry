import { getCachedPoetry } from "./data";
import { List } from './_components/list'

const defaultPagination = {
  page: 1,
  pageSize: 10,
};

export type PoetryListInitialValue = Awaited<ReturnType<typeof getCachedPoetry>>

export default async function PoetryList() {
  const initialValue = await getCachedPoetry(defaultPagination);

  return (
    <List initialValue={initialValue} defaultPagination={defaultPagination} />
  );
}
